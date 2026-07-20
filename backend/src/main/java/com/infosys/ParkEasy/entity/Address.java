package com.infosys.ParkEasy.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.infosys.ParkEasy.entity.type.AddressType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "address is required")
    @Column( nullable = false)
    private String addressLine;

    @NotBlank(message = "City is required")
    @Column(nullable = false)
    private String city;

    @NotEmpty(message = "state is required")
    @Column(nullable = false)
    private String state;

    @NotEmpty(message = "country is required")
    @Column(nullable = false)
    private String country;

    @NotEmpty(message = "pinCode is required")
    @Column(nullable = false)
    private String pinCode;

    @Enumerated(EnumType.STRING)
    private AddressType addressType;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;
}