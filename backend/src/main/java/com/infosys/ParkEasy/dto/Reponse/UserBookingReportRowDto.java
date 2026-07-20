package com.infosys.ParkEasy.dto.Reponse;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class UserBookingReportRowDto{

    private String user;
    private String parking;
    private String car;
    private Double amount;
    private LocalDateTime date;

}