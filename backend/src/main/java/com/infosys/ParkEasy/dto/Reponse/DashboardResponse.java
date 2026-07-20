package com.infosys.ParkEasy.dto.Reponse;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DashboardResponse {

    private List<Integer> monthlyBookings;
    private List<String> months;

    private List<Integer> hourlyBookings;
    private List<String> hours;

    private List<Integer> locationBookings;
    private List<String> locations;

    private List<Double> monthlyRevenue;

    private Integer dailyUsers;
    private Integer weeklyUsers;
    private Integer monthlyUsers;
}