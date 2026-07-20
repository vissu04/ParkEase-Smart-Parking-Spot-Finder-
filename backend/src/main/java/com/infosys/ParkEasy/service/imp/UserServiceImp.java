package com.infosys.ParkEasy.service.imp;

import com.infosys.ParkEasy.dto.Reponse.AddressResponseDto;
import com.infosys.ParkEasy.dto.Reponse.BookingResponseDto;
import com.infosys.ParkEasy.dto.Reponse.PaymentHistory;
import com.infosys.ParkEasy.dto.Reponse.UserProfileResponseDto;
import com.infosys.ParkEasy.dto.Reponse.VehicleResponseDto;
import com.infosys.ParkEasy.entity.*;
import com.infosys.ParkEasy.repository.*;
import com.infosys.ParkEasy.service.Interface.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly=true)
public class UserServiceImp implements UserService {

    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;
    private final PaymentOrderRepository paymentOrderRepository;
    private final ParkingRepository parkingRepository;
    private final VehicleRepository vehicleRepository;
    private final AddressRepository addressRepository;
    private final ModelMapper modelMapper;

    @Override
    public UserProfileResponseDto getProfile(){
        String email=SecurityContextHolder.getContext().getAuthentication().getName();
        User user=userRepository.findByEmail(email).orElseThrow(()->new UsernameNotFoundException("User not Found"));
        UserProfileResponseDto response=modelMapper.map(user,UserProfileResponseDto.class);
        response.setRoles(user.getRoleTypes().stream().toList());
        addressRepository.findByUser(user).ifPresent(a->response.setAddresses(modelMapper.map(a,AddressResponseDto.class)));
        vehicleRepository.findByUser(user).ifPresent(v->response.setVehicles(modelMapper.map(v,VehicleResponseDto.class)));
        return response;
    }

    @Override
    public List<BookingResponseDto> getAllBooking(){

        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not Found"));

        List<Booking> bookings = bookingRepository.findByUserId(user.getId());

        return bookings.stream().map(b -> {

            // ✅ Parking fetch using parkingId
            Parking parking = null;
            if(b.getParkingId() != null){
                parking = parkingRepository.findById(Long.valueOf(b.getParkingId())).orElse(null);
            }

            return BookingResponseDto.builder()

                    .bookingId(b.getBookingId())

                    .name(b.getName())
                    .phone(b.getPhone())
                    .vehicleNumber(b.getVehicleNumber())

                    .parkingId(b.getParkingId())
                    .parkingName(parking != null ? parking.getParkingName() : "")
                    .parkingCity(parking != null ? parking.getCity() : "")

                    .amount(b.getAmount())
                    .startTime(b.getStartTime())
                    .endTime(b.getEndTime())
                    .evStation(b.isEvStation())
                    .paymentId(b.getPaymentId())
                    .receiptId(b.getReceiptId())
                    .status(b.getStatus())
                    .createdAt(b.getCreatedAt())
                    .spotNumber(b.getSpotNumber() != null ? b.getSpotNumber() : "")
                    .floorName(b.getFloorName() != null ? b.getFloorName() : "")
                    .slotType(b.getSlotType())

                    .build();

        }).toList();
    }

    @Override
    public List<PaymentHistory> getAllPaymentHistory(){

        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not Found"));
        List<PaymentOrder> orders = paymentOrderRepository.findByUserId(user.getId());
        return orders.stream().map(o -> {
            PaymentHistory dto = new PaymentHistory();
            dto.setId(o.getId());
            dto.setPaymentId(o.getOrderId());
            dto.setAmount(o.getAmount());
            dto.setPaymentDate(o.getCreatedAt());
            dto.setStatus(o.getStatus());
            return dto;
        }).toList();
    }

    public VehicleResponseDto addVehicle(Vehicle vehicle){
        String email=SecurityContextHolder.getContext().getAuthentication().getName();
        User user=userRepository.findByEmail(email).orElseThrow(()->new UsernameNotFoundException("User not Found"));
        vehicleRepository.findByUser(user).ifPresent(v->{throw new RuntimeException("Vehicle already exists");});
        vehicle.setUser(user);
        Vehicle saved=vehicleRepository.save(vehicle);
        return modelMapper.map(saved,VehicleResponseDto.class);
    }

    public AddressResponseDto addAddress(Address address){
        String email=SecurityContextHolder.getContext().getAuthentication().getName();
        User user=userRepository.findByEmail(email).orElseThrow(()->new UsernameNotFoundException("User not Found"));
        addressRepository.findByUser(user).ifPresent(a->{throw new RuntimeException("Address already exists");});
        address.setUser(user);
        Address saved=addressRepository.save(address);
        return modelMapper.map(saved,AddressResponseDto.class);
    }
}