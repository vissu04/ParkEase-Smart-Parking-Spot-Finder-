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
public class NormalSlot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String prefix;
    private Integer totalSlots;
    private Integer evStations;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parking_id")
    @JsonBackReference
    private Parking parking;
}