package com.infosys.ParkEasy.dto.Reponse;

import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
public class UserReportResponseDto{

    private String customId;
    private String name;

    private String phone;
    private String email;
    private LocalDate joinedDate;

    private AddressResponseDto address;

    private String vehicle;

    private Double totalSpent;
    private Integer totalBookings;

    private List<UserBookingReportRowDto> bookingHistory;

}