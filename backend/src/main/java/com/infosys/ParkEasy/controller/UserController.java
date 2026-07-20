package com.infosys.ParkEasy.controller;

import com.infosys.ParkEasy.dto.Reponse.BookingResponseDto;
import com.infosys.ParkEasy.dto.Reponse.PaymentHistory;
import com.infosys.ParkEasy.dto.Reponse.UserProfileResponseDto;
import com.infosys.ParkEasy.service.Interface.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<UserProfileResponseDto> getUserProfile(){
       return ResponseEntity.ok( userService.getProfile());
    }
    @GetMapping("/booking-history")
    public ResponseEntity<List<BookingResponseDto>> getAllBooking(){
        return ResponseEntity.ok(userService.getAllBooking());
    }
    @GetMapping("/payments-history")
    public ResponseEntity<List<PaymentHistory>> getAllPaymentHistory(){
        return ResponseEntity.ok(userService.getAllPaymentHistory());
    }




}
