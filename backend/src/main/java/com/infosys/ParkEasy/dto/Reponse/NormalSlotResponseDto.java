package com.infosys.ParkEasy.dto.Reponse;

import lombok.Data;

@Data
public class NormalSlotResponseDto {
    private String prefix;
    private Integer totalSlots;
    private Integer occupied;
    private Integer evStations;
    private Integer evOccupied;
}