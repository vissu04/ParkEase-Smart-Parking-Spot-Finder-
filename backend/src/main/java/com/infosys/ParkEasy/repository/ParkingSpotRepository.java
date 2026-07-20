package com.infosys.ParkEasy.repository;

import com.infosys.ParkEasy.entity.ParkingSpot;
import com.infosys.ParkEasy.entity.type.SlotType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ParkingSpotRepository extends JpaRepository<ParkingSpot, Long> {

    @Query("SELECT COUNT(ps) FROM ParkingSpot ps")
    Long getTotalSlots();

    @Query("""
    SELECT COUNT(ps)
    FROM ParkingSpot ps
    WHERE ps.status = 'AVAILABLE'
    """)
    Long getAvailableSlots();

    @Query("""
    SELECT COUNT(ps)
    FROM ParkingSpot ps
    WHERE ps.status = 'OCCUPIED'
    """)
    Long getBookedSlots();

    @Query("""
    SELECT COUNT(ps)
    FROM ParkingSpot ps
    WHERE ps.slotType = 'EV'
    """)
    Long getTotalEvStations();

    @Query("""
    SELECT COUNT(ps)
    FROM ParkingSpot ps
    WHERE ps.slotType = 'EV'
    AND ps.status = 'AVAILABLE'
    """)
    Long getAvailableEvStations();

    @Query("""
    SELECT COUNT(ps)
    FROM ParkingSpot ps
    WHERE ps.slotType = 'EV'
    AND ps.status = 'OCCUPIED'
    """)
    Long getOccupiedEvStations();
    List<ParkingSpot> findByParking_IdAndSlotType(Long parkingId, SlotType slotType);
}