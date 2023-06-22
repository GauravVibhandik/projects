package com.app.service;

import java.util.List;

import com.app.entities.Comment;

public interface ICommentService {
	
	Comment addComment(long userId, long paperId,Comment transientComment);
	
	public List<Comment> getAllCommentsByPaperId(long paperId);
	
	public List<Comment> getAllCommentsByUserId(long puserId);
	

}
