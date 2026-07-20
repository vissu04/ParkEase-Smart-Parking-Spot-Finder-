package com.infosys.ParkEasy.dto.Reponse;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.infosys.ParkEasy.entity.type.RoleType;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class UserProfileResponseDto {

    private String customId;
    private String name;
    private String email;
    private String phone;

    private List<RoleType> roles = new ArrayList<>();

    private AddressResponseDto addresses;
    private VehicleResponseDto vehicles;
}
