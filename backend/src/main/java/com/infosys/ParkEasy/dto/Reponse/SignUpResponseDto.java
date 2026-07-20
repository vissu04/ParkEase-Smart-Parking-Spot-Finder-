package com.infosys.ParkEasy.dto.Reponse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignUpResponseDto {
    private Long id;
    private String name;
    private String jwt;

}
