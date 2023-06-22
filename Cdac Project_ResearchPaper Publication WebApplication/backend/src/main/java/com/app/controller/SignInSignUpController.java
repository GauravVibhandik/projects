package com.app.controller;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dao.UserRepository;
import com.app.dto.AuthenticationRequest;
import com.app.dto.SignInResponse;
import com.app.dto.UserRegRequest;
import com.app.entities.User;
import com.app.jwt_utils.JwtUtils;
import com.app.service.IUserService;

@RestController
@RequestMapping("/auth")
public class SignInSignUpController {

	@Autowired
	private IUserService userService;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private ModelMapper mapper;

	@Autowired
	private JwtUtils utils;

	@Autowired
	private AuthenticationManager manager;

	@PostMapping("/signin") //tested
	public ResponseEntity<?> validateUserCreateToken(@RequestBody @Valid AuthenticationRequest request) {

		UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(request.getEmail(),
				request.getPassword());
		try {
			Authentication authenticatedDetails = manager.authenticate(authToken);
			User user = userRepo.findByEmail(request.getEmail());
			SignInResponse resp = mapper.map(user, SignInResponse.class);
			resp.setUserRole(user.getRole().getRoleName());
			resp.setJwt(utils.generateJwtToken(authenticatedDetails));
			
			return ResponseEntity.ok(resp);
			
		} catch (BadCredentialsException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		}

	}
	@PostMapping("/signup") //tested
	public ResponseEntity<?> registerUser(@RequestBody @Valid UserRegRequest request) {
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.register(request));
	}
}
