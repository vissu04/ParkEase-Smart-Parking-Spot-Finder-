package com.infosys.ParkEasy.service;

import com.infosys.ParkEasy.entity.Booking;
import com.infosys.ParkEasy.entity.ParkingSpot;
import com.infosys.ParkEasy.entity.type.BookingStatus;
import com.infosys.ParkEasy.entity.type.SlotType;
import com.infosys.ParkEasy.repository.BookingRepository;
import com.infosys.ParkEasy.repository.ParkingSpotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SlotAllocationService {

    private final ParkingSpotRepository parkingSpotRepository;
    private final BookingRepository bookingRepository;

    public ParkingSpot allocateSlot(String parkingId,
                                    boolean evStation,
                                    Booking booking){

        SlotType slotType = evStation ? SlotType.EV : SlotType.NORMAL;

        List<ParkingSpot> spots =
                parkingSpotRepository.findByParking_IdAndSlotType(
                        Long.valueOf(parkingId),
                        slotType
                );

        for(ParkingSpot spot : spots){

            List<Booking> conflicts =
                    bookingRepository
                            .findByParkingSpotAndStatusAndEndTimeAfterAndStartTimeBefore(
                                    spot,
                                    BookingStatus.valueOf(BookingStatus.CONFIRMED.name()),
                                    booking.getStartTime(),
                                    booking.getEndTime()
                            );

            if(conflicts.isEmpty()){
                booking.setParkingSpot(spot);
                booking.setSpotNumber(spot.getSpotNumber());
                booking.setFloorName(spot.getFloorName());

                return spot;
            }
        }
        throw new RuntimeException("No slot available for selected time");
    }
}