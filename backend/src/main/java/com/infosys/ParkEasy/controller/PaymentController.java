package com.infosys.ParkEasy.controller;

import com.infosys.ParkEasy.dto.Request.BookingRequestDto;
import com.infosys.ParkEasy.service.Interface.PaymentService;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/create-order")
    public String createOrder(@RequestBody BookingRequestDto dto) throws RazorpayException {

        return paymentService.createPaymentOrder(dto);
    }

    @PostMapping("/verify")
    public String verify(@RequestParam String orderId, @RequestParam String paymentId) throws Exception {
        paymentService.verifyPayment(orderId,paymentId);
        return "Payment Verified";
    }
}