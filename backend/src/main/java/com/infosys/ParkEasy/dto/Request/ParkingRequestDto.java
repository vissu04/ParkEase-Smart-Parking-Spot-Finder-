package com.infosys.ParkEasy.dto.Request;

import com.infosys.ParkEasy.entity.type.ParkingType;
import com.infosys.ParkEasy.entity.type.BookingType;
import jakarta.persistence.Column;
import lombok.Data;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;

@Data
public class ParkingRequestDto {

    private String parkingName;
    private String address;
    private String city;
    private String phone;
    private String pinCode;

    private Double price;
    private LocalTime openTime;
    private LocalTime closeTime;
    private Double monthlyBookingPrice;

    private Boolean evEnabled;
    private Double evPrice;

    private ParkingType parkingType;
    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;

    private Set<BookingType> bookingTypes;

    private NormalSlotRequestDto normalSlots;

    private List<FloorRequestDto> floors;
}