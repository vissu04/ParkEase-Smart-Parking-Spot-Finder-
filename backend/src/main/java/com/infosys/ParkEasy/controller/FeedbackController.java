package com.infosys.ParkEasy.controller;

import com.infosys.ParkEasy.dto.FeedbackReqResDto;
import com.infosys.ParkEasy.service.Interface.FeedbackService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/feedback")
@RequiredArgsConstructor
public class FeedbackController {
    private final FeedbackService feedbackService;
    @PostMapping
    public ResponseEntity<FeedbackReqResDto> createFeedback(@RequestBody FeedbackReqResDto feedbackReqResDto){
       FeedbackReqResDto saveDto= feedbackService.createFeedback(feedbackReqResDto);
       return ResponseEntity.status(HttpStatus.CREATED).body(saveDto);
    }
    @GetMapping
    public ResponseEntity<List<FeedbackReqResDto>> getAllFeedback(){
        return ResponseEntity.ok(feedbackService.getAllFeedback());
    }
}
