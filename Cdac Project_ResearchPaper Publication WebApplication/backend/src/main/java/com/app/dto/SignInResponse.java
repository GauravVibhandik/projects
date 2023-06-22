package com.app.dto;

import com.app.entities.UserRole;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class SignInResponse extends BaseDto{

	private String firstName;
	private String lastName;
	private String email;
	private String jwt;
	private UserRole userRole;	
}
