package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Paper;

public interface PaperRepository extends JpaRepository<Paper, Long> {
		
	long deleteByAuthorId(long id);
	
	List<Paper> findByStatusTrueAndTopicId(long Id);
	
	List<Paper> findByStatusFalse();
	
	List<Paper> findByAuthorId(long Id);
	
	
}
