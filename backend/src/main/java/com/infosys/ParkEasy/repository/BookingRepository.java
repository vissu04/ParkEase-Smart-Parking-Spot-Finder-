package com.infosys.ParkEasy.repository;

import com.infosys.ParkEasy.entity.Booking;
import com.infosys.ParkEasy.entity.ParkingSpot;
import com.infosys.ParkEasy.entity.type.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    // Monthly bookings
    @Query(value = """
            SELECT DATE_FORMAT(created_at,'%b') AS month, COUNT(*) AS total
            FROM booking
            GROUP BY YEAR(created_at), MONTH(created_at), DATE_FORMAT(created_at,'%b')
            ORDER BY YEAR(created_at), MONTH(created_at)
            """, nativeQuery = true)
    List<Object[]> monthlyBookings();


    // Hourly bookings
    @Query(value = """
            SELECT HOUR(start_time) AS hour, COUNT(*) AS total
            FROM booking
            GROUP BY HOUR(start_time)
            ORDER BY HOUR(start_time)
            """, nativeQuery = true)
    List<Object[]> hourlyBookings();


    // Parking wise bookings
    @Query(value = """
            SELECT parking_id, COUNT(*) AS total
            FROM booking
            GROUP BY parking_id
            ORDER BY parking_id
            """, nativeQuery = true)
    List<Object[]> parkingBookings();


    // Dashboard stats
    @Query(value = """
        SELECT
            (SELECT COUNT(*) FROM parking),
            (SELECT COUNT(*) FROM parking_spot),
            (SELECT COUNT(*) FROM parking_spot ps
                WHERE ps.id NOT IN (
                    SELECT b.parking_spot_id
                    FROM booking b
                    WHERE b.start_time <= NOW()
                    AND b.end_time >= NOW()
                )
            ),
            (SELECT COUNT(*)
                FROM booking
                WHERE start_time <= NOW()
                AND end_time >= NOW()
            ),
            (SELECT COUNT(*) FROM `user`),
            (SELECT COUNT(*)
                FROM booking
                WHERE status = 'CONFIRMED'
            ),
            (SELECT COALESCE(SUM(amount),0)
                FROM booking
                WHERE status = 'CONFIRMED'
            )
        """, nativeQuery = true)
    List<Object[]> getDashboardStats();


    List<Booking> findByParkingSpotAndStatusAndEndTimeAfterAndStartTimeBefore(
            ParkingSpot spot,
            BookingStatus status,
            LocalDateTime start,
            LocalDateTime end
    );

    List<Booking> findByUserId(Long id);

    @Query("SELECT b FROM Booking b WHERE DATE(b.createdAt)=CURRENT_DATE")
    List<Booking> findTodayBookings();
    @Query("SELECT b FROM Booking b WHERE b.bookingId = :bookingId ORDER BY b.createdAt DESC")
    List<Booking> findAllByBookingId(String bookingId);
    Optional<Booking> findByBookingId(String bookingId);
}