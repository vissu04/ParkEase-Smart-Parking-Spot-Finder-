package com.infosys.ParkEasy.service.Interface;

import com.infosys.ParkEasy.dto.Reponse.ParkingResponseDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ParkingService {
    ResponseEntity<List<ParkingResponseDto>> getParking();

    ResponseEntity<ParkingResponseDto> getParkingById(Long parkingId);
}
