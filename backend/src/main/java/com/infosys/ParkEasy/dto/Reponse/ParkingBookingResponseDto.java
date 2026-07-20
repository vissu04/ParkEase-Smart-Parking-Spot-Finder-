package com.infosys.ParkEasy.dto.Reponse;

import com.infosys.ParkEasy.entity.type.BookingStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ParkingBookingResponseDto {
    private String customId;
    private String user;
    private String parking;
    private String slot;
    private String car;
    private Double amount;
    private BookingStatus status;
    private LocalDateTime date;

}
