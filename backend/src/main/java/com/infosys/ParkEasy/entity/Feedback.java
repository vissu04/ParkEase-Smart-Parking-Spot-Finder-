package com.infosys.ParkEasy.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String parkingName;

    @Column(nullable = false)
    private LocalDate visitDate;

    @Column(nullable = false)
    private LocalTime visitTime;

    @Column(nullable = false)
    private Integer overAllExperience;

    private Integer cleanliness;
    private Integer safety;
    private Integer valueForMoney;
    private Integer easeOfFindingParking;

    private boolean cctv;
    private boolean securityGuard;
    private boolean evCharging;
    private boolean lighting;
    private boolean coveredParking;

    private String anyIssue;
    private boolean recommendParkEase;
    private String writeExperience;
    private String anySuggestion;
    private String contactEmail;
}