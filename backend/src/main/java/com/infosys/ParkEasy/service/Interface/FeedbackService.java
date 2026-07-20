package com.infosys.ParkEasy.service.Interface;


import com.infosys.ParkEasy.dto.FeedbackReqResDto;

import java.util.List;

public interface FeedbackService {

    FeedbackReqResDto createFeedback(FeedbackReqResDto feedbackReqResDto);

    List<FeedbackReqResDto> getAllFeedback();
}
