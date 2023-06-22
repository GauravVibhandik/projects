package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Comment;

public interface CommentRepository extends JpaRepository<Comment,Long> {
	
	long deleteByUserId(long id);
	
	List<Comment> findByPaperId(long paperId);
	
	List<Comment> findByUserId(long userId);
	
}
