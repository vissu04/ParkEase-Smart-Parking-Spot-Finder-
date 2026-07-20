package com.infosys.ParkEasy.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.infosys.ParkEasy.entity.type.BookingStatus;
import com.infosys.ParkEasy.entity.type.SlotType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, updatable = false)
    private String bookingId;

    private String name;
    private String phone;
    private String vehicleNumber;

    private Double amount;

    private String parkingId;

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    private boolean evStation;

    private String paymentId;
    private String receiptId;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(columnDefinition = "TEXT")
    private String qrCode;

    @ManyToOne
    @JoinColumn(name = "parking_spot_id")
    private ParkingSpot parkingSpot;

    private String spotNumber;
    private String floorName;

    @Enumerated(EnumType.STRING)
    private SlotType slotType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    @JsonIgnore
    private User user;
}