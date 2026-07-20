package com.infosys.ParkEasy.dto.Request;

import com.infosys.ParkEasy.entity.type.AddressType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class AddressRequestDto {
    @NotEmpty(message = "address is required")
    private String addressLine;
    @NotBlank(message = "City is required")
    private String city;

    @NotEmpty(message = "state is required")
    private String state;

    @NotEmpty(message = "country is required")
    private String country;

    @NotEmpty(message = "pinCode is required")
    private String pinCode;

    private AddressType addressType;
}
