package com.infosys.ParkEasy.service;

import com.infosys.ParkEasy.entity.User;
import com.infosys.ParkEasy.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
    @RequiredArgsConstructor
    public class CustomUserDetailsService implements UserDetailsService {

        private final UserRepository userRepository;

        @Override
        public UserDetails loadUserByUsername(String email)
                throws UsernameNotFoundException {

            User user = userRepository.findByEmail(email)
                    .orElseThrow(() ->
                            new UsernameNotFoundException("User not found"));
            var authorities = user.getRoleTypes()
                    .stream()
                    .map(role -> new SimpleGrantedAuthority("ROLE_" + role.name()))
                    .toList();
            return new org.springframework.security.core.userdetails.User(
                    user.getEmail(),
                    user.getPassword(),
                    authorities
            );
        }

    }