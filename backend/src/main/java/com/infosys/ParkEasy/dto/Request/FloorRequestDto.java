package com.infosys.ParkEasy.dto.Request;

import lombok.Data;

@Data
public class FloorRequestDto {

    private String floorName;
    private String prefix;
    private Integer totalSlots;
    private Integer evStations;

}