package com.infosys.ParkEasy.repository;

import com.infosys.ParkEasy.entity.User;
import com.infosys.ParkEasy.entity.Vehicle;
import jakarta.validation.constraints.NotEmpty;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface VehicleRepository extends JpaRepository<Vehicle,Long>{
    Optional<Vehicle> findByUser(User user);

    boolean existsByVehicleNumber(@NotEmpty(message = "Vehicle Number is required") String vehicleNumber);
}