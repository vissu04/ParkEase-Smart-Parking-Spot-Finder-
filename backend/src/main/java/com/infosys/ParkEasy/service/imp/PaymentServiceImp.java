package com.infosys.ParkEasy.service.imp;

import com.infosys.ParkEasy.Util.QRCodeGenerator;
import com.infosys.ParkEasy.dto.Request.BookingRequestDto;
import com.infosys.ParkEasy.entity.*;
import com.infosys.ParkEasy.entity.type.BookingStatus;
import com.infosys.ParkEasy.entity.type.PaymentStatus;
import com.infosys.ParkEasy.repository.*;
import com.infosys.ParkEasy.service.Interface.PaymentService;
import com.infosys.ParkEasy.service.SlotAllocationService;
import com.razorpay.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentServiceImp implements PaymentService {

    @Value("${razorpay.key_id}")
    private String key_id;

    @Value("${razorpay.key_secret}")
    private String key_secret;

    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;
    private final PaymentOrderRepository paymentOrderRepository;
    private final PaymentTransactionRepository paymentTransactionRepository;
    private final SlotAllocationService slotAllocationService;

    private User getUser(){

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return userRepository
                .findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
    @Override
    @Transactional
    public String createPaymentOrder(BookingRequestDto dto) throws RazorpayException {

        RazorpayClient client = new RazorpayClient(key_id, key_secret);

        JSONObject request = new JSONObject();
        request.put("amount", dto.getAmount() * 100);
        request.put("currency", "INR");

        String receipt = UUID.randomUUID().toString().replace("-", "").substring(0, 16);
        request.put("receipt", receipt);

        Order razorOrder = client.orders.create(request);

        User user = getUser();

        Booking booking = Booking.builder()
                .name(dto.getName())
                .phone(dto.getPhone())
                .vehicleNumber(dto.getVehicleNumber())
                .parkingId(dto.getParkingId())
                .amount(dto.getAmount())
                .startTime(dto.getStartDate())
                .endTime(dto.getEndDate())
                .evStation(dto.isEvStation())
                .status(BookingStatus.PENDING)
                .user(user)
                .bookingId(receipt)
                .build();

        bookingRepository.save(booking);

        PaymentOrder paymentOrder = PaymentOrder.builder()
                .orderId(razorOrder.get("id"))
                .amount(dto.getAmount())
                .currency("INR")
                .receipt(receipt)
                .status(PaymentStatus.CREATED)
                .booking(booking)
                .user(user)
                .build();

        paymentOrderRepository.save(paymentOrder);
        JSONObject response = new JSONObject();
        response.put("order", razorOrder);
        response.put("key", key_id);

        return response.toString();
    }

    @Override
    @Transactional
    public void verifyPayment(String orderId,String paymentId) throws Exception {

        PaymentOrder order = paymentOrderRepository
                .findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        RazorpayClient client = new RazorpayClient(key_id,key_secret);
        Payment payment = client.payments.fetch(paymentId);
        String status = payment.get("status");

        PaymentTransaction transaction = new PaymentTransaction();

        transaction.setPaymentId(paymentId);
        transaction.setAmount(order.getAmount());
        transaction.setPaymentOrder(order);
        Booking booking = order.getBooking();

        if("captured".equals(status)){

            order.setStatus(PaymentStatus.SUCCESS);
            // SLOT ALLOCATION
            ParkingSpot spot = slotAllocationService.allocateSlot(
                    booking.getParkingId(),
                    booking.isEvStation(),
                    booking
            );

            // save slot snapshot
            booking.setParkingSpot(spot);
            booking.setSpotNumber(spot.getSpotNumber());
            booking.setFloorName(spot.getFloorName());
            booking.setSlotType(spot.getSlotType());

            booking.setStatus(BookingStatus.CONFIRMED);
            booking.setPaymentId(paymentId);
            booking.setReceiptId(order.getReceipt());
            String qrData = String.format(
                    "{\"name\":\"%s\",\"vehicle\":\"%s\",\"phone\":\"%s\",\"paymentId\":\"%s\",\"status\":\"%s\",\"spot\":\"%s\",\"floor\":\"%s\"}",
                    booking.getName(),
                    booking.getVehicleNumber(),
                    booking.getPhone(),
                    booking.getPaymentId(),
                    booking.getStatus(),
                    booking.getSpotNumber(),
                    booking.getFloorName()
            );
            String qrCodeBase64 = QRCodeGenerator.generateQRCode(qrData);
            booking.setQrCode(qrCodeBase64);
            // SAVE BOOKING
            bookingRepository.save(booking);
            transaction.setStatus(PaymentStatus.SUCCESS);

        }else{

            order.setStatus(PaymentStatus.FAILED);
            booking.setStatus(BookingStatus.FAILED);
            bookingRepository.save(booking);
            transaction.setStatus(PaymentStatus.FAILED);
        }

        paymentTransactionRepository.save(transaction);
    }
}