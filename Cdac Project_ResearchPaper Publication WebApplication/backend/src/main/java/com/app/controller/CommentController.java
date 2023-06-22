package com.app.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.app.entities.Comment;
import com.app.service.ICommentService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/comments")
public class CommentController {
	@Autowired
	private ICommentService commentService;
	
	@GetMapping("/{paperId}") //tested
	public ResponseEntity<?> fetchAllCommentsByPaperId(@PathVariable long paperId) {
		return  ResponseEntity.ok(commentService.getAllCommentsByPaperId(paperId));
	}
	
	
	@PostMapping("/{userId}/paper/{paperId}") //tested
	public ResponseEntity<?> addNewComment(@PathVariable long userId,@PathVariable long paperId,@RequestBody  @Valid Comment transientComment) {
		return ResponseEntity.status(HttpStatus.CREATED).body(commentService.addComment(userId, paperId, transientComment));
	}
}
