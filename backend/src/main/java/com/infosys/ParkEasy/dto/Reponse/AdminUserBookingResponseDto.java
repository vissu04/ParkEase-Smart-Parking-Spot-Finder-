package com.infosys.ParkEasy.dto.Reponse;

import com.infosys.ParkEasy.entity.type.BookingStatus;
import com.infosys.ParkEasy.entity.type.SlotType;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AdminUserBookingResponseDto {
    private String bookingId;
    private Double amount;
    private String parkingId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private boolean evStation;
    private String paymentId;
    private BookingStatus status;
    private LocalDateTime createdAt;
    private String spotNumber;
    private String floorName;
    private SlotType slotType;
}
