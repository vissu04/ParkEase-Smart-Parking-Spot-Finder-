package com.infosys.ParkEasy.service.Interface;

import com.infosys.ParkEasy.dto.Reponse.BookingResponseDto;
import com.infosys.ParkEasy.dto.Reponse.PaymentHistory;
import com.infosys.ParkEasy.dto.Reponse.UserProfileResponseDto;

import java.util.List;

public interface UserService {

    UserProfileResponseDto getProfile();

    List<BookingResponseDto> getAllBooking();

    List<PaymentHistory> getAllPaymentHistory();
}