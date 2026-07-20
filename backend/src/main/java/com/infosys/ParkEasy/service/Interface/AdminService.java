package com.infosys.ParkEasy.service.Interface;

import com.infosys.ParkEasy.dto.Reponse.*;
import com.infosys.ParkEasy.dto.Request.ParkingRequestDto;
import com.infosys.ParkEasy.entity.Parking;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface AdminService {

    DashboardStatsResponseDto getDashboardStats();
    ParkingResponseDto registerParking(ParkingRequestDto requestDto);
    Parking updateParking(Long id,Parking parking);
    void deleteParking(Long id);
    List<ParkingResponseDto>getAllParkings();
    Parking getParkingById(Long id);
    UserReportResponseDto getUserDetails(String customId);
    ResponseEntity<List<ManageUserResponseDto>> getAllUserDetails();
    DashboardResponse dashboard();
    List<ParkingBookingResponseDto> getTodayBookings();

    AdminProfileResponseDto getProfile();

    String registerNewAdmin(String email);
}