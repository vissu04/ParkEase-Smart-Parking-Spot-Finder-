package com.infosys.ParkEasy.service.imp;

import com.infosys.ParkEasy.config.AuthUtil;
import com.infosys.ParkEasy.dto.Reponse.LoginResponseDto;
import com.infosys.ParkEasy.dto.Reponse.SignUpResponseDto;
import com.infosys.ParkEasy.dto.Request.LoginRequestDto;
import com.infosys.ParkEasy.dto.Request.SignUpRequestDto;
import com.infosys.ParkEasy.entity.User;
import com.infosys.ParkEasy.entity.type.RoleType;
import com.infosys.ParkEasy.entity.type.UserStatusType;
import com.infosys.ParkEasy.repository.UserRepository;
import com.infosys.ParkEasy.service.Interface.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImp implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthUtil authUtil;
    private final AuthenticationManager authenticationManager;

    private String generateCustomId() {
        return UUID.randomUUID()
                .toString()
                .substring(0, 8)
                .toUpperCase();
    }
    @Override
    public SignUpResponseDto signup(SignUpRequestDto signUpRequestDto) {

        Optional<User> existUser = userRepository.findByEmail(signUpRequestDto.getEmail());
        if (existUser.isPresent()) {
            throw new IllegalArgumentException("User already exist");
        }

        User user = new User();
        user.setName(signUpRequestDto.getName());
        user.setEmail(signUpRequestDto.getEmail());
        user.setPassword(passwordEncoder.encode(signUpRequestDto.getPassword()));
        user.setPhone(signUpRequestDto.getPhone());
        user.setCustomId(generateCustomId());
        user.setRoleTypes(Set.of(RoleType.USER));
        user.setStatusType(UserStatusType.ACTIVE);
        User savedUser = userRepository.save(user);

        String token = authUtil.generateTokenByEmail(savedUser);

        return new SignUpResponseDto(
                savedUser.getId(),
                savedUser.getName(),
                token
        );
    }
    @Override
    public LoginResponseDto login(LoginRequestDto loginRequestDto) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequestDto.getEmail(),
                        loginRequestDto.getPassword()
                )
        );
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setLastLogin(java.time.LocalDateTime.now());
        userRepository.save(user);
        String token = authUtil.generateTokenByEmail(user);
        return new LoginResponseDto(
                user.getId(),
                token
        );
    }
}
