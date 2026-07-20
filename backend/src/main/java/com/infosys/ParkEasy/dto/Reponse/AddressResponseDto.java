package com.infosys.ParkEasy.dto.Reponse;

import com.infosys.ParkEasy.entity.type.AddressType;
import lombok.Data;

@Data
public class AddressResponseDto {

    private Long id;
    private String addressLine;
    private String city;
    private String state;
    private String country;
    private String pinCode;
    private AddressType addressType;
}
