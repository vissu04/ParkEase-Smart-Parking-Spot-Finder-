package com.infosys.ParkEasy.repository;

import com.infosys.ParkEasy.dto.Reponse.ParkingResponseDto;
import com.infosys.ParkEasy.entity.Parking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ParkingRepository extends JpaRepository<Parking, Long> {

    @Query("""
    SELECT new com.infosys.ParkEasy.dto.Reponse.ParkingResponseDto(
        p.id,
        p.parkingName,
        p.address,

        COUNT(ps.id),

        COALESCE(SUM(CASE
            WHEN ps.id NOT IN (
                SELECT b.parkingSpot.id
                FROM Booking b
                WHERE b.startTime <= CURRENT_TIMESTAMP
                AND b.endTime >= CURRENT_TIMESTAMP
            )
        THEN 1 ELSE 0 END), 0),

        COALESCE(SUM(CASE WHEN ps.slotType = 'EV' THEN 1 ELSE 0 END), 0),

        COALESCE(SUM(CASE
            WHEN ps.slotType = 'EV'
            AND ps.id NOT IN (
                SELECT b.parkingSpot.id
                FROM Booking b
                WHERE b.startTime <= CURRENT_TIMESTAMP
                AND b.endTime >= CURRENT_TIMESTAMP
            )
        THEN 1 ELSE 0 END), 0),

        p.price,
        p.evPrice,
        p.latitude,
        p.longitude,
        p.monthlyBookingPrice   
    )
    FROM Parking p
    LEFT JOIN p.spots ps
    GROUP BY 
        p.id, p.parkingName, p.address,
        p.price, p.evPrice,
        p.latitude, p.longitude,
        p.monthlyBookingPrice
    """)
    List<ParkingResponseDto> getRealtimeParkingStatus();


    @Query("""
    SELECT new com.infosys.ParkEasy.dto.Reponse.ParkingResponseDto(
        p.id,
        p.parkingName,
        p.address,

        COUNT(ps.id),

        COALESCE(SUM(CASE
            WHEN ps.id NOT IN (
                SELECT b.parkingSpot.id
                FROM Booking b
                WHERE b.startTime <= CURRENT_TIMESTAMP
                AND b.endTime >= CURRENT_TIMESTAMP
            )
        THEN 1 ELSE 0 END), 0),

        COALESCE(SUM(CASE WHEN ps.slotType = 'EV' THEN 1 ELSE 0 END), 0),

        COALESCE(SUM(CASE
            WHEN ps.slotType = 'EV'
            AND ps.id NOT IN (
                SELECT b.parkingSpot.id
                FROM Booking b
                WHERE b.startTime <= CURRENT_TIMESTAMP
                AND b.endTime >= CURRENT_TIMESTAMP
            )
        THEN 1 ELSE 0 END), 0),

        p.price,
        p.evPrice,
        p.latitude,
        p.longitude,
        p.monthlyBookingPrice   
    )
    FROM Parking p
    LEFT JOIN p.spots ps
    WHERE p.id = :parkingId
    GROUP BY 
        p.id, p.parkingName, p.address,
        p.price, p.evPrice,
        p.latitude, p.longitude,
        p.monthlyBookingPrice
    """)
    ParkingResponseDto getParkingRealtimeStatus(@Param("parkingId") Long parkingId);
}