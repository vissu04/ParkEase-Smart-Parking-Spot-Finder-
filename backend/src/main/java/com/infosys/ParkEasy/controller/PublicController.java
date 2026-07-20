package com.infosys.ParkEasy.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public")
public class PublicController {

    @GetMapping("health-check")
    public String healthCheck(){
        return "ParkEasy service is running...";
    }
}
