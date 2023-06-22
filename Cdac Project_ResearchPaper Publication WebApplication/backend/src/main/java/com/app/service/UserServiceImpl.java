
package com.app.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.AddressRepository;
import com.app.dao.CommentRepository;
import com.app.dao.PaperRepository;
import com.app.dao.RoleRepository;
import com.app.dao.UserRepository;
import com.app.dto.UserRegRequest;
import com.app.dto.UserRegisResponse;
import com.app.entities.User;

@Service
@Transactional
public class UserServiceImpl implements IUserService {

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private RoleRepository roleRepo;
	
	@Autowired
	private AddressRepository addressRepo;
	
	@Autowired
	private CommentRepository commentRepo;
	
	@Autowired
	private PaperRepository paperRepo;

	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private PasswordEncoder encoder;

	@Override
	public List<User> getAllUsers() {
		return userRepo.findAll();
	}

	@Override
	public UserRegisResponse register(UserRegRequest request) {
		User user = mapper.map(request, User.class);
		user.setRole(roleRepo.findByRoleName((request.getUserRole())));
		user.setPassword(encoder.encode(request.getPassword()));
		userRepo.save(user);
		UserRegisResponse resp = mapper.map(user, UserRegisResponse.class);
		resp.setUserRole(user.getRole().getRoleName());
		return resp;
	}

	@Override
	public String deleteUser(long userId) {	
		if (addressRepo.existsById(userId))
			addressRepo.deleteById(userId);
		commentRepo.deleteByUserId(userId);
		paperRepo.deleteByAuthorId(userId);
		userRepo.deleteById(userId);
		return "deleted user details with id" + userId;
	}

}
