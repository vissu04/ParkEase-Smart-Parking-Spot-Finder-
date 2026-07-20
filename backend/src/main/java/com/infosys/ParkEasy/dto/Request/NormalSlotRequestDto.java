package com.infosys.ParkEasy.dto.Request;

import lombok.Data;

@Data
public class NormalSlotRequestDto {

    private String prefix;
    private Integer totalSlots;
    private Integer evStations;
}