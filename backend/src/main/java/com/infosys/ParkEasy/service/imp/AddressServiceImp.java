package com.infosys.ParkEasy.service.imp;

import com.infosys.ParkEasy.dto.Reponse.AddressResponseDto;
import com.infosys.ParkEasy.dto.Request.AddressRequestDto;
import com.infosys.ParkEasy.entity.Address;
import com.infosys.ParkEasy.entity.User;
import com.infosys.ParkEasy.repository.AddressRepository;
import com.infosys.ParkEasy.repository.UserRepository;
import com.infosys.ParkEasy.service.Interface.AddressService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AddressServiceImp implements AddressService {
    private final ModelMapper modelMapper;
    private final AddressRepository addressRepository;
    private final UserRepository userRepository;
    @Override
    public AddressResponseDto createAddress(AddressRequestDto dto){

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        if(user.getAddresses()!=null && !user.getAddresses().isEmpty()){
            throw new IllegalStateException("Address already exists");
        }
        Address address = Address.builder()
                .addressLine(dto.getAddressLine())
                .city(dto.getCity())
                .state(dto.getState())
                .country(dto.getCountry())
                .pinCode(dto.getPinCode())
                .addressType(dto.getAddressType())
                .user(user)
                .build();

        Address saved = addressRepository.save(address);
        if(user.getAddresses()!=null){
            user.getAddresses().add(saved);
        }
        return modelMapper.map(saved, AddressResponseDto.class);
    }
    @Override
    public List<AddressResponseDto> getUserAddresses() {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        List<Address> addresses = addressRepository.findAllByUserId(user.getId());

        return addresses.stream()
                .map(address -> modelMapper.map(address, AddressResponseDto.class))
                .toList();
    }

    @Override
    public AddressResponseDto updateAddress(Long addressId, AddressRequestDto dto){

        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        if(!address.getUser().getId().equals(user.getId()))
            throw new RuntimeException("Unauthorized access");

        address.setAddressLine(dto.getAddressLine());
        address.setCity(dto.getCity());
        address.setState(dto.getState());
        address.setCountry(dto.getCountry());
        address.setPinCode(dto.getPinCode());
        address.setAddressType(dto.getAddressType());

        Address saved = addressRepository.save(address);

        return modelMapper.map(saved, AddressResponseDto.class);
    }

    @Override
    public void deleteAddress(Long addressId) {
        String email=SecurityContextHolder.getContext().getAuthentication().getName();
        User user=userRepository.findByEmail(email).orElseThrow(()->new UsernameNotFoundException("User not found"));
        Address existAddress=addressRepository.findById(addressId).orElseThrow(()->new RuntimeException("Address " +
                "not " +
                "found"));
        if(!existAddress.getUser().getId().equals(user.getId()))  throw new RuntimeException("Unauthorized access");
        addressRepository.deleteById(addressId);
    }
}
