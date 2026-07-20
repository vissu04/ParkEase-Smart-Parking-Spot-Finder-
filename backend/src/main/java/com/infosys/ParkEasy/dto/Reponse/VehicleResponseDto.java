package com.infosys.ParkEasy.dto.Reponse;

import lombok.Data;

@Data
public class VehicleResponseDto {
    private Long id;
    private String vehicleNumber;
    private String vehicleType;
    private String brand;
    private String model;
    private String color;

}
