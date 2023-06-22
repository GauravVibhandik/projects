package com.app.service;

import com.app.dto.AddressDTO;
import com.app.dto.ApiResponse;

public interface IAddressService {
	ApiResponse assignAddress(long userId, AddressDTO address);

	ApiResponse changeCity(long userId, String city);
	
	AddressDTO getUserAddress(long userId);
}
