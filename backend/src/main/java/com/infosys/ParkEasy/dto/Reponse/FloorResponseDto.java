package com.infosys.ParkEasy.dto.Reponse;

import lombok.Data;

@Data
public class FloorResponseDto {
    private String floorName;
    private String prefix;
    private Integer totalSpots;
    private Integer occupied;
    private Integer evStations;
    private Integer evOccupied;
}
