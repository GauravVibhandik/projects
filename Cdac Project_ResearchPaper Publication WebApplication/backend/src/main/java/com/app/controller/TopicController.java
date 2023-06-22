package com.app.controller;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.app.dto.TopicDTO;
import com.app.service.ITopicService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/topics")
public class TopicController {

	@Autowired
	private ITopicService topicService;
	
	@GetMapping //tested
	public ResponseEntity<?> fetchAllTopics() {
		return  ResponseEntity.ok(topicService.getAllTopics());
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')") //tested
	@PostMapping
	public ResponseEntity<?> addNewTopic(@RequestBody  @Valid TopicDTO topic) {
		System.out.println("in add new topic " + topic);
		return ResponseEntity.status(HttpStatus.CREATED).body(topicService.addTopic(topic));
	}

}
