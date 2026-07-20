package com.infosys.ParkEasy.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Floor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String floorName;
    private String prefix;
    private Integer totalSpots;
    private Integer evStations;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parking_id")
    @JsonBackReference
    private Parking parking;
}