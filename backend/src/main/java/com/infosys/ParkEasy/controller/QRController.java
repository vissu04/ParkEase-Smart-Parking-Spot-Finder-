package com.infosys.ParkEasy.controller;

import com.infosys.ParkEasy.entity.Booking;
import com.infosys.ParkEasy.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import static java.util.Map.entry;

@RestController
@RequestMapping("/booking")
@RequiredArgsConstructor
public class QRController {

    private final BookingRepository bookingRepository;

    @GetMapping("/{bookingId}/qr")
    public ResponseEntity<?> getQrCode(@PathVariable String bookingId){
        Booking booking = bookingRepository
                .findAllByBookingId(bookingId)
                .stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if(booking.getQrCode() == null){
            return ResponseEntity.badRequest().body("QR not generated yet");
        }

        return ResponseEntity.ok().body(
                Map.ofEntries(
                        entry("bookingId", booking.getBookingId()),
                        entry("name", booking.getName()),
                        entry("phone", booking.getPhone()),
                        entry("vehicle", booking.getVehicleNumber()),

                        entry("paymentId", booking.getPaymentId() != null ? booking.getPaymentId() : ""),
                        entry("status", booking.getStatus() != null ? booking.getStatus().toString() : ""),

                        entry("spot", booking.getSpotNumber() != null ? booking.getSpotNumber() : ""),
                        entry("floor", booking.getFloorName() != null ? booking.getFloorName() : ""),

                        entry("startTime", booking.getStartTime() != null ? booking.getStartTime().toString() : ""),
                        entry("endTime", booking.getEndTime() != null ? booking.getEndTime().toString() : ""),

                        entry("qrCode", booking.getQrCode())
                )
        );
    }
}