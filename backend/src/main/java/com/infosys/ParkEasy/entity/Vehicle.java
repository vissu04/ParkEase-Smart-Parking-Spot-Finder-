package com.infosys.ParkEasy.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotEmpty(message = "Vehicle Number is required")
    @Column(unique = true)
    private String vehicleNumber;
    private String vehicleType;
    @NotEmpty(message = "Brand is required")
    private String brand;
    @NotEmpty(message = "model is required")
    private String model;
    private String color;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;
}