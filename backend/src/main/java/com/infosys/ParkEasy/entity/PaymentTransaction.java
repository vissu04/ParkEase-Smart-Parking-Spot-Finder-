package com.infosys.ParkEasy.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.infosys.ParkEasy.entity.type.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
public class PaymentTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String paymentId;

    private Double amount;

    @Enumerated(EnumType.STRING)
    private PaymentStatus status;

    @ManyToOne
    @JoinColumn(name="payment_order_id")
    @JsonIgnore
    private PaymentOrder paymentOrder;
}