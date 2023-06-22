package com.app.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.app.dto.PaperRegistrationDTO;
import com.app.dto.PaperRespDTO;

public interface IPaperService {
	
	String addPaper(MultipartFile imgFile,MultipartFile pdfFile, long userId,long topicId,PaperRegistrationDTO paper) throws IOException;
	
	List<PaperRespDTO> getPapersByTopicId(long topicId) throws IOException;
	
	List<PaperRespDTO> getPapersByAuthorId(long authorId) throws IOException;
	
	List<PaperRespDTO> getPapersByStatus() throws IOException;
	
	byte[] restoreImage(long empId) throws IOException;
	
	byte[] restorePdf(long empId) throws IOException;

	String partialUpdateStatus(long paperId,boolean status);
	
	String deletePaper(long paperId);
	
	

}
