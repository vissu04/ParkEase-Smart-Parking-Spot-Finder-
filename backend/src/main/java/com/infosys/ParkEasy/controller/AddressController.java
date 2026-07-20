package com.infosys.ParkEasy.controller;

import com.infosys.ParkEasy.dto.Reponse.AddressResponseDto;
import com.infosys.ParkEasy.dto.Request.AddressRequestDto;
import com.infosys.ParkEasy.service.Interface.AddressService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/address")
@AllArgsConstructor
public class AddressController {

    private final AddressService addressService;

    @PostMapping
    public ResponseEntity<AddressResponseDto> createAddress(@Valid @RequestBody AddressRequestDto addressRequestDto) {
        AddressResponseDto saved = addressService.createAddress(addressRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping
    public ResponseEntity<List<AddressResponseDto>> getUserAddress() {
        return ResponseEntity.ok(addressService.getUserAddresses());
    }

    @PutMapping("/{addressId}")
    public ResponseEntity<AddressResponseDto> updateAddress(@PathVariable Long addressId,
                                                           @Valid @RequestBody AddressRequestDto addressRequestDto) {
        AddressResponseDto updated = addressService.updateAddress(addressId, addressRequestDto);
        return ResponseEntity.ok(updated);
    }
    @DeleteMapping("/{addressId}")
    public ResponseEntity<Void> deleteAddress(@PathVariable Long addressId){
        addressService.deleteAddress(addressId);
      return  ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}