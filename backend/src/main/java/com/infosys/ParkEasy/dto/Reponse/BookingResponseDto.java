package com.infosys.ParkEasy.dto.Reponse;

import com.infosys.ParkEasy.entity.type.BookingStatus;
import com.infosys.ParkEasy.entity.type.SlotType;
import lombok.*;

import java.time.LocalDateTime;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookingResponseDto {
    private String bookingId;

    private String name;
    private String phone;
    private String vehicleNumber;
    private String parkingName;
    private String parkingCity;
    private Double amount;

    private String parkingId;

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    private boolean evStation;

    private String paymentId;
    private String receiptId;

    private BookingStatus status;

    private LocalDateTime createdAt;

    private String spotNumber;
    private String floorName;

    private SlotType slotType;
}
