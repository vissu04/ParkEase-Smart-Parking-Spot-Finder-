package com.infosys.ParkEasy.dto.Reponse;

import com.infosys.ParkEasy.entity.type.RoleType;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class AdminProfileResponseDto {
    private String customId;
    private String name;
    private String email;
    private String phone;
    private LocalDateTime createdAt;
    private LocalDateTime lastLogin;

    private List<RoleType> roles = new ArrayList<>();

    private AddressResponseDto addresses;
}
