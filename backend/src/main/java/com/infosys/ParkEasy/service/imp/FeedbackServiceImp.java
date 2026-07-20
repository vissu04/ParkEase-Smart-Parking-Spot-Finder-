package com.infosys.ParkEasy.service.imp;

import com.infosys.ParkEasy.dto.FeedbackReqResDto;
import com.infosys.ParkEasy.entity.Feedback;
import com.infosys.ParkEasy.repository.FeedbackRepository;
import com.infosys.ParkEasy.service.Interface.FeedbackService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FeedbackServiceImp implements FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final ModelMapper modelMapper;

    @Override
    public FeedbackReqResDto createFeedback(FeedbackReqResDto dto) {
        Feedback feedback = modelMapper.map(dto, Feedback.class);
        Feedback saved = feedbackRepository.save(feedback);
        return modelMapper.map(saved, FeedbackReqResDto.class);
    }
    @Override
    public List<FeedbackReqResDto> getAllFeedback() {

        return feedbackRepository.findAll()
                .stream()
                .map(feedback -> modelMapper.map(feedback, FeedbackReqResDto.class))
                .toList();
    }
}