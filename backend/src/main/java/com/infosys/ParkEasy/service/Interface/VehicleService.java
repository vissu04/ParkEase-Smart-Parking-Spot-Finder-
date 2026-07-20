package com.infosys.ParkEasy.service.Interface;

import com.infosys.ParkEasy.dto.Reponse.VehicleResponseDto;
import com.infosys.ParkEasy.dto.Request.VehicleRequestDto;

public interface VehicleService {
    VehicleResponseDto registerVehicle(VehicleRequestDto vehicleRequestDto);

    void deleteVehicle(Long vehicleId);
}
