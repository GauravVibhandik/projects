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
public class UserRegisResponse extends BaseDto{

	private String firstName;
	private String lastName;
	private String email;
	private UserRole userRole;	
}
