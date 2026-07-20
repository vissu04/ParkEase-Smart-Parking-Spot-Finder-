package com.infosys.ParkEasy.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.infosys.ParkEasy.entity.type.SlotType;
import com.infosys.ParkEasy.entity.type.SpotStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ParkingSpot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String spotNumber;
    private String floorName;
    @Enumerated(EnumType.STRING)
    private SpotStatus status;
    @Enumerated(EnumType.STRING)
    private SlotType slotType;

    @ManyToOne
    @JoinColumn(name = "parking_id")
    @JsonIgnore
    private Parking parking;
}
