package com.app.service;

import java.util.List;

import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.CommentRepository;
import com.app.dao.PaperRepository;
import com.app.dao.UserRepository;
import com.app.entities.Comment;
import com.app.entities.Paper;
import com.app.entities.User;

@Service
@Transactional
public class CommentServiceImpl implements ICommentService{
	
	@Autowired
	private CommentRepository commentRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private PaperRepository paperRepo;
	
	@Override
	public List<Comment> getAllCommentsByPaperId(long paperId) {
		return commentRepo.findByPaperId(paperId);
	}
	
	@Override
	public List<Comment> getAllCommentsByUserId(long userId) {
		return commentRepo.findByUserId(userId);
	}

	@Override
	public Comment addComment(long userId, long paperId,Comment transientComment) {
		Paper paper = paperRepo.findById(paperId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid topic id!!!"));
		
		User user = userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid user id!!!"));
		
		transientComment.setPaper(paper);
		transientComment.setUser(user);
		return commentRepo.save(transientComment);
	}
	
}
