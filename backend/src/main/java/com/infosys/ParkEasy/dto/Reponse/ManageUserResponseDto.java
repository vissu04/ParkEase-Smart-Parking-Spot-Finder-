package com.infosys.ParkEasy.dto.Reponse;

import com.infosys.ParkEasy.entity.type.UserStatusType;
import lombok.Data;

@Data
public class ManageUserResponseDto {
    private String customId;
    private String name;
    private String phone;
    private String cityName;
    private String vehicle;
    private  BookingResponseDto lastBooking;
    private String totalBooking;
    private UserStatusType userStatusType;

}
