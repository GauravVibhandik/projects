package com.app.service;

import javax.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.AddressRepository;
import com.app.dao.UserRepository;
import com.app.dto.AddressDTO;
import com.app.dto.ApiResponse;
import com.app.entities.Address;
import com.app.entities.User;

@Service
@Transactional
public class AddressServiceImpl implements IAddressService {
	@Autowired
	private UserRepository userRepo;

	@Autowired
	private AddressRepository adrRepo;

	@Autowired
	private ModelMapper mapper;

	@Override
	public ApiResponse assignAddress(long userId, AddressDTO address) {
		
		User user = userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Invalid User ID "));
		Address transientAdr = mapper.map(address, Address.class);
		transientAdr.setOwner(user);
		adrRepo.save(transientAdr);
		return new ApiResponse("Address assigned for User " + user.getFirstName());
	}

	@Override
	public ApiResponse changeCity(long userId, String city) {
		Address address = adrRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid User/Address Id!!!!"));
		address.setCity(city);
		return new ApiResponse("Address updated for user  ");
	}

	@Override
	public AddressDTO getUserAddress(long userId) {
		AddressDTO addressDTO = mapper.map(
				adrRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Invalid Address Id!!!!")),
				AddressDTO.class);
		return addressDTO;

	}

}
