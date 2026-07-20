package com.infosys.ParkEasy.service.imp;

import com.infosys.ParkEasy.dto.Reponse.ParkingResponseDto;
import com.infosys.ParkEasy.entity.Parking;
import com.infosys.ParkEasy.entity.type.BookingType;
import com.infosys.ParkEasy.repository.ParkingRepository;
import com.infosys.ParkEasy.service.Interface.ParkingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ParkingServiceImp implements ParkingService {

    private final ParkingRepository parkingRepository;

    @Override
    public ResponseEntity<List<ParkingResponseDto>> getParking() {

        List<ParkingResponseDto> parkings =
                parkingRepository.getRealtimeParkingStatus();

        List<Parking> all = parkingRepository.findAll();

        Map<Long, Set<BookingType>> map = all.stream()
                .collect(Collectors.toMap(
                        Parking::getId,
                        Parking::getBookingTypes
                ));

        parkings.forEach(p -> p.setBookingType(map.get(p.getId())));

        return ResponseEntity.ok(parkings);
    }

    @Override
    public ResponseEntity<ParkingResponseDto> getParkingById(Long parkingId) {

        ParkingResponseDto p =
                parkingRepository.getParkingRealtimeStatus(parkingId);

        Parking parking = parkingRepository.findById(parkingId).orElse(null);

        if (parking != null && p != null) {
            p.setBookingType(parking.getBookingTypes());
        }

        return ResponseEntity.ok(p);
    }
}