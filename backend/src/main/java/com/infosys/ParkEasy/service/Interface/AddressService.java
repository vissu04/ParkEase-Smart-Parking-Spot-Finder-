package com.infosys.ParkEasy.service.Interface;

import com.infosys.ParkEasy.dto.Reponse.AddressResponseDto;
import com.infosys.ParkEasy.dto.Request.AddressRequestDto;

import java.util.List;

public interface AddressService { ;
    AddressResponseDto createAddress(AddressRequestDto addressRequestDto);
    List<AddressResponseDto> getUserAddresses();
    AddressResponseDto updateAddress(Long addressId, AddressRequestDto addressRequestDto);
    void deleteAddress(Long addressId);
}
