package com.app.service;

import java.util.List;

import com.app.dto.UserRegRequest;
import com.app.dto.UserRegisResponse;
import com.app.entities.User;

public interface IUserService {
	
	List<User> getAllUsers();
		
	UserRegisResponse register(UserRegRequest request);
	
	String deleteUser(long userId);

}
