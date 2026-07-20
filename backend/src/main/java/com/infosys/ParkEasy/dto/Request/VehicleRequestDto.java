package com.infosys.ParkEasy.dto.Request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class VehicleRequestDto {
    @NotEmpty(message = "Vehicle Number is required")
    private String vehicleNumber;
    private String vehicleType;
    @NotEmpty(message = "Brand is required")
    private String brand;
    @NotEmpty(message = "model is required")
    private String model;
    private String color;
}
