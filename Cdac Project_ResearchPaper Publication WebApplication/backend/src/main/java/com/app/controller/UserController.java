
package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.app.dto.ApiResponse;
import com.app.service.IUserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/users")
public class UserController {

	@Autowired
	private IUserService userService;

	@PreAuthorize("hasRole('ROLE_ADMIN')") //tested
	@GetMapping
	public ResponseEntity<?> fetchAllUsers() {
		return  ResponseEntity.ok(userService.getAllUsers());
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")  //tested
	@DeleteMapping("/{userId}")
	public ResponseEntity<?> deleteUserDetails(@PathVariable long userId) {
		return ResponseEntity.ok(new ApiResponse(userService.deleteUser(userId)));
	}

}
