package com.infosys.ParkEasy.controller;

import com.infosys.ParkEasy.dto.Reponse.VehicleResponseDto;
import com.infosys.ParkEasy.dto.Request.VehicleRequestDto;
import com.infosys.ParkEasy.service.Interface.VehicleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/vehicle")
@RequiredArgsConstructor
public class VehicleController {
    private final VehicleService vehicleService;
    @PostMapping("/register")
    public ResponseEntity<VehicleResponseDto> registerVehicle(@Valid @RequestBody VehicleRequestDto vehicleRequestDto) {
        VehicleResponseDto response = vehicleService.registerVehicle(vehicleRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    @DeleteMapping("/{vehicleId}")
    public ResponseEntity<Void> deleteVehicle(@PathVariable Long vehicleId){
        vehicleService.deleteVehicle(vehicleId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }







}
