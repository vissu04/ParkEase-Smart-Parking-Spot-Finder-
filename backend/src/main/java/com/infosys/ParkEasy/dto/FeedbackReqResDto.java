package com.infosys.ParkEasy.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FeedbackReqResDto {

    private Long id;

    @NotEmpty
    private String parkingName;

    @NotNull
    private LocalDate visitDate;

    @NotNull
    private LocalTime visitTime;

    @NotNull
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