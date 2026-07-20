package com.infosys.ParkEasy.service.imp;

import com.infosys.ParkEasy.dto.Reponse.VehicleResponseDto;
import com.infosys.ParkEasy.dto.Request.VehicleRequestDto;
import com.infosys.ParkEasy.entity.User;
import com.infosys.ParkEasy.entity.Vehicle;
import com.infosys.ParkEasy.repository.UserRepository;
import com.infosys.ParkEasy.repository.VehicleRepository;
import com.infosys.ParkEasy.service.Interface.VehicleService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VehicleServiceImp implements VehicleService {

    private final VehicleRepository vehicleRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Override
    public VehicleResponseDto registerVehicle(VehicleRequestDto dto){
        String email=SecurityContextHolder.getContext().getAuthentication().getName();
        User user=userRepository.findByEmail(email)
                .orElseThrow(()->new UsernameNotFoundException("User Not found"));

        vehicleRepository.findByUser(user)
                .ifPresent(v->{throw new RuntimeException("Vehicle already registered");});

        if(vehicleRepository.existsByVehicleNumber(dto.getVehicleNumber()))
            throw new RuntimeException("Vehicle number already exists");

        Vehicle vehicle=Vehicle.builder()
                .vehicleNumber(dto.getVehicleNumber())
                .vehicleType(dto.getVehicleType())
                .brand(dto.getBrand())
                .model(dto.getModel())
                .color(dto.getColor())
                .user(user)
                .build();

        Vehicle saved=vehicleRepository.save(vehicle);
        return modelMapper.map(saved,VehicleResponseDto.class);
    }

    @Override
    public void deleteVehicle(Long vehicleId){
        String email=SecurityContextHolder.getContext().getAuthentication().getName();
        User user=userRepository.findByEmail(email)
                .orElseThrow(()->new UsernameNotFoundException("User Not found"));

        Vehicle vehicle=vehicleRepository.findById(vehicleId)
                .orElseThrow(()->new RuntimeException("Vehicle not found"));

        if(!vehicle.getUser().getId().equals(user.getId()))
            throw new RuntimeException("Unauthorized access");

        vehicleRepository.delete(vehicle);
    }
}