package com.app.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import com.app.entities.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
public class UserRegRequest {
	@NotBlank(message = "email is required")
	@Email(message = "invalid email format")
	private String email;
	@Pattern(regexp="((?=.*\\d)(?=.*[a-z])(?=.*[#@$*]).{5,20})",message = "Blank or Invalid password")
	private String password;
	@NotBlank(message = "first name is required")
	private String firstName;
	@NotBlank(message = "Last name is required")
	private String lastName;
	@NotNull(message = "Role is required")
	private UserRole userRole;
}
