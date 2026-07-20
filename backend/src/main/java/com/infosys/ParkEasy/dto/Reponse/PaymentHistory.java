package com.infosys.ParkEasy.dto.Reponse;

import com.infosys.ParkEasy.entity.type.PaymentStatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PaymentHistory {
    private Long id;

    private String paymentId;

    private Double amount;
    private LocalDateTime paymentDate;
    @Enumerated(EnumType.STRING)
    private PaymentStatus status;
}
