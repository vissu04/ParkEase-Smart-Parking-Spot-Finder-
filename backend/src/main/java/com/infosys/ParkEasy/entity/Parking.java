package com.infosys.ParkEasy.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.infosys.ParkEasy.entity.type.BookingType;
import com.infosys.ParkEasy.entity.type.ParkingType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class Parking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String parkingName;
    private String address;
    private String city;
    private String phone;
    private String pinCode;

    private Double price;

    private LocalTime openTime;
    private LocalTime closeTime;
    private Double monthlyBookingPrice;

    private Boolean evEnabled;
    private Double evPrice;
    private Set<BookingType> bookingTypes=new HashSet<>();

    @Enumerated(EnumType.STRING)
    private ParkingType parkingType;
    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;

    @OneToMany(mappedBy = "parking", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Floor> floors;

    @OneToOne(mappedBy = "parking", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private NormalSlot normalSlot;

    @OneToMany(mappedBy = "parking", cascade = CascadeType.ALL)
    private List<ParkingSpot> spots;
    public void setNormalSlot(NormalSlot slot) {
        this.normalSlot = slot;
        slot.setParking(this);
    }
    @CreationTimestamp
    private LocalDateTime createAt;
}