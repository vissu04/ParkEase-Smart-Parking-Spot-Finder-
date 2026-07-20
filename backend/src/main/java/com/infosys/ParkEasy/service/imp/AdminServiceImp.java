package com.infosys.ParkEasy.service.imp;

import com.infosys.ParkEasy.dto.Reponse.*;
import com.infosys.ParkEasy.dto.Request.FloorRequestDto;
import com.infosys.ParkEasy.dto.Request.ParkingRequestDto;
import com.infosys.ParkEasy.entity.*;
import com.infosys.ParkEasy.entity.type.BookingType;
import com.infosys.ParkEasy.entity.type.RoleType;
import com.infosys.ParkEasy.entity.type.SlotType;
import com.infosys.ParkEasy.entity.type.SpotStatus;
import com.infosys.ParkEasy.repository.*;
import com.infosys.ParkEasy.service.Interface.AdminService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminServiceImp implements AdminService {

    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;
    private final ParkingRepository parkingRepository;
    private final ParkingSpotRepository parkingSpotRepository;
    private final PaymentOrderRepository paymentOrderRepository;
    private final ModelMapper modelMapper;

    @Override
    public DashboardStatsResponseDto getDashboardStats(){
        List<Object[]> result=bookingRepository.getDashboardStats();
        Object[] stats=result.get(0);
        return new DashboardStatsResponseDto(
                ((Number)stats[0]).longValue(),
                ((Number)stats[1]).longValue(),
                ((Number)stats[2]).longValue(),
                ((Number)stats[3]).longValue(),
                ((Number)stats[4]).longValue(),
                ((Number)stats[5]).longValue(),
                ((Number)stats[6]).doubleValue()
        );
    }

    @Override
    @Transactional
    public ParkingResponseDto registerParking(ParkingRequestDto dto){
        Parking parking=new Parking();
        parking.setParkingName(dto.getParkingName());
        parking.setAddress(dto.getAddress());
        parking.setCity(dto.getCity());
        parking.setPhone(dto.getPhone());
        parking.setPinCode(dto.getPinCode());
        parking.setMonthlyBookingPrice(dto.getMonthlyBookingPrice());
        parking.setPrice(dto.getPrice());
        parking.setOpenTime(dto.getOpenTime());
        parking.setCloseTime(dto.getCloseTime());
        parking.setEvEnabled(dto.getEvEnabled());
        parking.setEvPrice(dto.getEvPrice());

        Set<BookingType> types=dto.getBookingTypes();
        if(types==null||types.isEmpty()){
            types=new HashSet<>(Collections.singleton(BookingType.HOURLY));
        }
        parking.setBookingTypes(types);

        parking.setLatitude(dto.getLatitude());
        parking.setLongitude(dto.getLongitude());
        parking.setParkingType(dto.getParkingType());

        Parking savedParking=parkingRepository.save(parking);
        List<ParkingSpot> spots=new ArrayList<>();

        if(dto.getNormalSlots()!=null){
            String prefix=dto.getNormalSlots().getPrefix();
            Integer totalSlots=dto.getNormalSlots().getTotalSlots();
            Integer evSlots=dto.getNormalSlots().getEvStations();

            if(totalSlots==null||totalSlots<=0){
                throw new RuntimeException("Total slots required");
            }

            if(evSlots==null){
                evSlots=0;
            }

            for(int i=1;i<=totalSlots;i++){
                ParkingSpot spot=new ParkingSpot();
                spot.setStatus(SpotStatus.AVAILABLE);
                spot.setParking(savedParking);

                if(i<=evSlots){
                    spot.setSlotType(SlotType.EV);
                    spot.setSpotNumber(prefix+i+"-EV");
                }else{
                    spot.setSlotType(SlotType.NORMAL);
                    spot.setSpotNumber(prefix+i);
                }
                spots.add(spot);
            }
        }

        if(dto.getFloors()!=null&&!dto.getFloors().isEmpty()){
            for(FloorRequestDto floor:dto.getFloors()){
                String prefix=floor.getPrefix();
                Integer totalSlots=floor.getTotalSlots();
                Integer evSlots=floor.getEvStations();

                if(totalSlots==null||totalSlots<=0){
                    throw new RuntimeException("Total slots required");
                }

                if(evSlots==null){
                    evSlots=0;
                }

                for(int i=1;i<=totalSlots;i++){
                    ParkingSpot spot=new ParkingSpot();
                    spot.setStatus(SpotStatus.AVAILABLE);
                    spot.setParking(savedParking);
                    spot.setFloorName(floor.getFloorName());

                    if(i<=evSlots){
                        spot.setSlotType(SlotType.EV);
                        spot.setSpotNumber(prefix+i+"-EV");
                    }else{
                        spot.setSlotType(SlotType.NORMAL);
                        spot.setSpotNumber(prefix+i);
                    }
                    spots.add(spot);
                }
            }
        }

        parkingSpotRepository.saveAll(spots);

        long totalSlots=spots.size();
        long availableSlots=spots.stream().filter(s->s.getStatus()==SpotStatus.AVAILABLE).count();
        long evStations=spots.stream().filter(s->s.getSlotType()==SlotType.EV).count();
        long evAvailable=spots.stream().filter(s->s.getSlotType()==SlotType.EV&&s.getStatus()==SpotStatus.AVAILABLE).count();

        ParkingResponseDto response=modelMapper.map(savedParking, ParkingResponseDto.class);
        response.setParkingAddress(savedParking.getAddress());
        response.setParkingPrice(savedParking.getPrice());
        response.setTotalSlot(totalSlots);
        response.setAvailableSlot(availableSlots);
        response.setEvStation(evStations);
        response.setEvAvailable(evAvailable);

        return response;
    }

    @Override
    public Parking updateParking(Long id,Parking parking){
        Parking existing=parkingRepository.findById(id).orElseThrow();
        existing.setParkingName(parking.getParkingName());
        existing.setAddress(parking.getAddress());
        existing.setCity(parking.getCity());
        existing.setPhone(parking.getPhone());
        existing.setPinCode(parking.getPinCode());
        existing.setPrice(parking.getPrice());
        existing.setOpenTime(parking.getOpenTime());
        existing.setCloseTime(parking.getCloseTime());
        existing.setEvEnabled(parking.getEvEnabled());
        existing.setEvPrice(parking.getEvPrice());
        existing.setParkingType(parking.getParkingType());
        return parkingRepository.save(existing);
    }

    @Override
    public void deleteParking(Long id){
        parkingRepository.deleteById(id);
    }

    @Override
    public List<ParkingResponseDto> getAllParkings(){
        return parkingRepository.getRealtimeParkingStatus();
    }

    @Override
    public Parking getParkingById(Long id){
        return parkingRepository.findById(id).orElseThrow();
    }

    @Override
    public UserReportResponseDto getUserDetails(String customId){
        User user=userRepository.findByCustomId(customId)
                .orElseThrow(()->new UsernameNotFoundException("User Not Exist"));
        UserReportResponseDto dto=new UserReportResponseDto();
        dto.setCustomId(user.getCustomId());
        dto.setName(user.getName());
        dto.setPhone(user.getPhone());
        dto.setEmail(user.getEmail());
        dto.setJoinedDate(user.getCreatedAt().toLocalDate());
        if(!user.getAddresses().isEmpty()){
            Address address=user.getAddresses().iterator().next();
            dto.setAddress(modelMapper.map(address,AddressResponseDto.class));
        }
        if(!user.getVehicles().isEmpty()){
            dto.setVehicle(user.getVehicles().iterator().next().getVehicleNumber());
        }
        List<UserBookingReportRowDto> history=user.getBookings().stream().map(p->{
            Booking b=p.getBooking();
            UserBookingReportRowDto row=new UserBookingReportRowDto();
            row.setUser(user.getName());
            row.setParking(b.getParkingId());
            row.setCar(b.getVehicleNumber());
            row.setAmount(p.getAmount());
            row.setDate(b.getCreatedAt());
            return row;
        }).toList();
        dto.setBookingHistory(history);
        dto.setTotalBookings(history.size());
        double total=history.stream().mapToDouble(UserBookingReportRowDto::getAmount).sum();
        dto.setTotalSpent(total);
        return dto;
    }
    @Override
    public ResponseEntity<List<ManageUserResponseDto>> getAllUserDetails() {

        List<User> users = userRepository.findAll();

        List<ManageUserResponseDto> response = users.stream().map(user -> {

            ManageUserResponseDto dto = new ManageUserResponseDto();

            dto.setCustomId(user.getCustomId());
            dto.setName(user.getName());
            dto.setPhone(user.getPhone());
            dto.setUserStatusType(user.getStatusType());

            String vehicle = user.getVehicles() != null && !user.getVehicles().isEmpty()
                    ? user.getVehicles().iterator().next().getVehicleNumber()
                    : "-";
            dto.setVehicle(vehicle);

            String city = user.getAddresses() != null && !user.getAddresses().isEmpty()
                    ? user.getAddresses().iterator().next().getCity()
                    : "-";
            dto.setCityName(city);

            BookingResponseDto lastBooking;

            if (user.getBookings() != null && !user.getBookings().isEmpty()) {

                PaymentOrder latest = user.getBookings().stream()
                        .max(java.util.Comparator.comparing(PaymentOrder::getCreatedAt))
                        .orElse(null);

                Booking booking = latest.getBooking(); // 🔥 IMPORTANT

                lastBooking = BookingResponseDto.builder()
                        .bookingId(booking.getBookingId())
                        .name(booking.getName())
                        .phone(booking.getPhone())
                        .vehicleNumber(booking.getVehicleNumber())
                        .parkingId(booking.getParkingId())
                        .amount(latest.getAmount())
                        .startTime(booking.getStartTime())
                        .endTime(booking.getEndTime())
                        .spotNumber(booking.getSpotNumber())
                        .floorName(booking.getFloorName())
                        .slotType(booking.getSlotType())
                        .status(booking.getStatus())
                        .createdAt(booking.getCreatedAt())
                        .build();

            } else {

                lastBooking = BookingResponseDto.builder()
                        .bookingId("-")
                        .amount(0.0)
                        .spotNumber("-")
                        .floorName("-")
                        .build();
            }

            dto.setLastBooking(lastBooking);

            dto.setTotalBooking(String.valueOf(
                    user.getBookings() != null ? user.getBookings().size() : 0
            ));

            return dto;

        }).toList();

        return ResponseEntity.ok(response);
    }

    @Override
    public DashboardResponse dashboard(){
        List<Object[]> bookingData = bookingRepository.monthlyBookings();
        List<Integer> bookings = new ArrayList<>();
        List<String> months = new ArrayList<>();
        for(Object[] row : bookingData){
            months.add(String.valueOf(row[0]));
            bookings.add(((Number)row[1]).intValue());
        }

        List<Object[]> hourlyData = bookingRepository.hourlyBookings();
        List<Integer> hourlyBookings = new ArrayList<>();
        List<String> hours = new ArrayList<>();
        for(Object[] row : hourlyData){
            int hour = ((Number)row[0]).intValue();
            String label;
            if(hour == 0) label = "12AM";
            else if(hour < 12) label = hour + "AM";
            else if(hour == 12) label = "12PM";
            else label = (hour - 12) + "PM";
            hours.add(label);
            hourlyBookings.add(((Number)row[1]).intValue());
        }

        List<Object[]> parkingData = bookingRepository.parkingBookings();
        List<Integer> locationBookings = new ArrayList<>();
        List<String> locations = new ArrayList<>();
        for(Object[] row : parkingData){
            locations.add("Parking " + row[0]);
            locationBookings.add(((Number)row[1]).intValue());
        }

        List<Object[]> revenueData = paymentOrderRepository.monthlyRevenue();
        List<Double> revenue = new ArrayList<>();
        for(Object[] row : revenueData){
            revenue.add(((Number)row[1]).doubleValue());
        }

        long dailyUsers = userRepository.countByCreatedAtAfter(LocalDateTime.now().minusDays(1));
        long weeklyUsers = userRepository.countByCreatedAtAfter(LocalDateTime.now().minusWeeks(1));
        long monthlyUsers = userRepository.countByCreatedAtAfter(LocalDateTime.now().minusMonths(1));

        return DashboardResponse.builder()
                .months(months)
                .monthlyBookings(bookings)
                .hours(hours)
                .hourlyBookings(hourlyBookings)
                .locations(locations)
                .locationBookings(locationBookings)
                .monthlyRevenue(revenue)
                .dailyUsers((int)dailyUsers)
                .weeklyUsers((int)weeklyUsers)
                .monthlyUsers((int)monthlyUsers)
                .build();
    }

    @Override
    public List<ParkingBookingResponseDto> getTodayBookings(){
        List<Booking> bookings=bookingRepository.findTodayBookings();
        return bookings.stream().map(b->{
            ParkingBookingResponseDto dto=new ParkingBookingResponseDto();
            dto.setCustomId(b.getUser().getCustomId());
            dto.setUser(b.getUser().getName());
            dto.setParking(b.getParkingId());
            dto.setSlot(b.getSpotNumber());
            dto.setCar(b.getVehicleNumber());
            dto.setAmount(b.getAmount());
            dto.setStatus(b.getStatus());
            dto.setDate(b.getCreatedAt());
            return dto;
        }).toList();
    }

    @Override
    public AdminProfileResponseDto getProfile() {
        String email = org.springframework.security.core.context.SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Admin not found"));

        AdminProfileResponseDto dto = new AdminProfileResponseDto();
        dto.setCustomId(user.getCustomId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setLastLogin(user.getLastLogin());
        dto.setRoles(new ArrayList<>(user.getRoleTypes()));

        if (user.getAddresses() != null && !user.getAddresses().isEmpty()) {
            Address address = user.getAddresses().iterator().next();
            dto.setAddresses(modelMapper.map(address, AddressResponseDto.class));
        }

        return dto;
    }

    @Override
    public String registerNewAdmin(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not found"));
        if (user.getRoleTypes().contains(RoleType.ADMIN)) {
            return "⚠ User is already an ADMIN";
        }
        user.getRoleTypes().add(RoleType.ADMIN);
        String part1 = UUID.randomUUID().toString().substring(0, 4).toUpperCase();
        String part2 = UUID.randomUUID().toString().substring(0, 4).toUpperCase();
        user.setCustomId("ADMIN-" + part1 + "-" + part2);
        userRepository.save(user);
        return " User upgraded to ADMIN successfully";
    }
}