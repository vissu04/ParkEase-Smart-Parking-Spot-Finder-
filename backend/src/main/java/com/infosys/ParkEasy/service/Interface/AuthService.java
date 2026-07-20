package com.infosys.ParkEasy.service.Interface;

import com.infosys.ParkEasy.dto.Reponse.LoginResponseDto;
import com.infosys.ParkEasy.dto.Reponse.SignUpResponseDto;
import com.infosys.ParkEasy.dto.Request.LoginRequestDto;
import com.infosys.ParkEasy.dto.Request.SignUpRequestDto;

public interface AuthService {

    SignUpResponseDto signup(SignUpRequestDto signUpRequestDto);

    LoginResponseDto login(LoginRequestDto loginRequestDto);
}
