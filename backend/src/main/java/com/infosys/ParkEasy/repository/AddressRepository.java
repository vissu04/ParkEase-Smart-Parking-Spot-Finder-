package com.infosys.ParkEasy.repository;

import com.infosys.ParkEasy.entity.Address;
import com.infosys.ParkEasy.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AddressRepository extends JpaRepository<Address,Long>{
    Optional<Address> findByUser(User user);

    List<Address> findAllByUserId(Long id);
}