package com.infosys.ParkEasy.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.infosys.ParkEasy.entity.type.RoleType;
import com.infosys.ParkEasy.entity.type.UserStatusType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Builder
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "custom_id", unique = true, nullable = false, updatable = false)
    private String customId;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(unique = true)
    private String phone;

    @Column(name = "full_name", nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    private UserStatusType statusType;

    @Builder.Default
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Set<RoleType> roleTypes = new HashSet<>();

    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<Address> addresses = new HashSet<>();

    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<Vehicle> vehicles = new HashSet<>();

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<PaymentOrder> bookings;

    @CreationTimestamp
    private LocalDateTime createdAt;

    private LocalDateTime lastLogin;
}