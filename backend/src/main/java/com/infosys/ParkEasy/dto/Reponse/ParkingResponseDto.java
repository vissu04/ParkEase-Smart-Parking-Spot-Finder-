package com.infosys.ParkEasy.dto.Reponse;

import com.infosys.ParkEasy.entity.type.BookingType;
import lombok.*;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ParkingResponseDto {

    private Long id;
    private String parkingName;
    private String parkingAddress;

    private Long totalSlot;
    private Long availableSlot;

    private Long evStation;
    private Long evAvailable;

    private Double parkingPrice;
    private Double evPrice;

    private Double latitude;
    private Double longitude;

    private Set<BookingType> bookingType;

    private Double monthlyBookingPrice;

    public ParkingResponseDto(
            Long id,
            String parkingName,
            String parkingAddress,
            Long totalSlot,
            Long availableSlot,
            Long evStation,
            Long evAvailable,
            Double parkingPrice,
            Double evPrice,
            Double latitude,
            Double longitude,
            Double monthlyBookingPrice
    ) {
        this.id = id;
        this.parkingName = parkingName;
        this.parkingAddress = parkingAddress;
        this.totalSlot = totalSlot;
        this.availableSlot = availableSlot;
        this.evStation = evStation;
        this.evAvailable = evAvailable;
        this.parkingPrice = parkingPrice;
        this.evPrice = evPrice;
        this.latitude = latitude;
        this.longitude = longitude;
        this.monthlyBookingPrice = monthlyBookingPrice;
    }
}