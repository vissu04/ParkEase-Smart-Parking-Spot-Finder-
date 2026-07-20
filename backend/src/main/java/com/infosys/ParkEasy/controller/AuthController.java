package com.infosys.ParkEasy.controller;

import com.infosys.ParkEasy.dto.Reponse.LoginResponseDto;
import com.infosys.ParkEasy.dto.Reponse.SignUpResponseDto;
import com.infosys.ParkEasy.dto.Request.LoginRequestDto;
import com.infosys.ParkEasy.dto.Request.SignUpRequestDto;
import com.infosys.ParkEasy.service.Interface.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<SignUpResponseDto>signup(@RequestBody @Valid SignUpRequestDto signUpRequestDto){
       return ResponseEntity.ok(authService.signup(signUpRequestDto));
    }
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto>login(@RequestBody LoginRequestDto loginRequestDto){
        return ResponseEntity.ok(authService.login(loginRequestDto));
    }

}
