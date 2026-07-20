package com.infosys.ParkEasy.service.Interface;

import com.infosys.ParkEasy.dto.Request.BookingRequestDto;
import com.razorpay.RazorpayException;

public interface PaymentService {
    String createPaymentOrder(BookingRequestDto bookingRequestDto) throws RazorpayException;

    void verifyPayment(String orderId,String paymentId) throws Exception;
}
