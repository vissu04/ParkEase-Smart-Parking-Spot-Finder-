package com.infosys.ParkEasy.dto.Reponse;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponseDto {
    private Long id;
    private String jwt;

}
