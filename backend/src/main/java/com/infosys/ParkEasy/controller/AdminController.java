package com.infosys.ParkEasy.controller;

import com.infosys.ParkEasy.dto.Reponse.*;
import com.infosys.ParkEasy.dto.Request.ParkingRequestDto;
import com.infosys.ParkEasy.entity.Parking;

import com.infosys.ParkEasy.entity.User;
import com.infosys.ParkEasy.service.Interface.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;


    @GetMapping("/dashboardStats")
    public ResponseEntity<DashboardStatsResponseDto> getDashboardStats() {
        return ResponseEntity.ok(adminService.getDashboardStats());
    }
    @GetMapping("/getDashboard")
    public ResponseEntity<DashboardResponse> dashboard(){
        return ResponseEntity.ok(adminService.dashboard());
    }

    @PostMapping("/parking")
    public ResponseEntity<ParkingResponseDto> registerParking(@RequestBody ParkingRequestDto parkingRequestDto){
        ParkingResponseDto saveParking=adminService.registerParking(parkingRequestDto);
       return ResponseEntity.status(HttpStatus.CREATED).body(saveParking);
    }

    @PutMapping("/parking/{id}")
    public Parking updateParking(@PathVariable Long id,@RequestBody Parking parking){
        return adminService.updateParking(id,parking);
    }

    @DeleteMapping("/parking/{id}")
    public void deleteParking(@PathVariable Long id){
        adminService.deleteParking(id);
    }

    @GetMapping("/parkings")
    public List<ParkingResponseDto> getAll(){
        return adminService.getAllParkings();
    }

    @GetMapping("/parking/{id}")
    public Parking getById(@PathVariable Long id){
        return adminService.getParkingById(id);
    }

    @GetMapping("/allUserDetails")
    public ResponseEntity<List<ManageUserResponseDto>> getAllUserDetails(){
       return adminService.getAllUserDetails();
    }

    @GetMapping("/user/{customId}")
    ResponseEntity<UserReportResponseDto> getUserDetails(@PathVariable String customId){
     return   ResponseEntity.ok(adminService.getUserDetails(customId));
    }

    @GetMapping("/bookings/today")
    public ResponseEntity<List<ParkingBookingResponseDto>> getTodayBookings(){
        return ResponseEntity.ok(adminService.getTodayBookings());
    }
    @GetMapping("/profile")
    public ResponseEntity<AdminProfileResponseDto> getProfile(){
       return ResponseEntity.ok(adminService.getProfile());
    }

    @PostMapping("/registerNewAdmin")
    public ResponseEntity<String> registerNewAdmin(@RequestBody String email) {
        email = email.replace("\"", "").trim();
        return ResponseEntity.ok(adminService.registerNewAdmin(email));
    }


}
