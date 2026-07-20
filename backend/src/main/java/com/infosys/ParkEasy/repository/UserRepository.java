package com.infosys.ParkEasy.repository;

import com.infosys.ParkEasy.entity.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {


    Optional<User> findByEmail(@NotBlank(message = "Email is required") @Email(message = "Invalid email format") String email);

    Optional<User> findByCustomId(String customerId);

    long countByCreatedAtAfter(LocalDateTime localDateTime);
}
