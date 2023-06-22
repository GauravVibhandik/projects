package com.app.controller;

import java.io.IOException;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.ApiResponse;
import com.app.dto.PaperRegistrationDTO;
import com.app.service.IPaperService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/papers")

public class PaperController {

	@Autowired
	private IPaperService paperService;

	@PreAuthorize("hasRole('ROLE_AUTHOR')")//tested
	@PostMapping(path = "/{userId}/topic/{topicId}", consumes = { "multipart/form-data" })
	public ResponseEntity<?> registerPaper(@RequestParam MultipartFile imgFile, @PathVariable long userId,
			@RequestParam MultipartFile pdfFile,
			@PathVariable long topicId, @RequestPart @Valid PaperRegistrationDTO request) throws IOException {
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(new ApiResponse(paperService.addPaper(imgFile,pdfFile, userId, topicId, request)));
	}

	@GetMapping(value = "/{paperId}/images", produces = { MediaType.IMAGE_GIF_VALUE, MediaType.IMAGE_JPEG_VALUE,
			MediaType.IMAGE_PNG_VALUE, MediaType.APPLICATION_PDF_VALUE }) //tested
	public ResponseEntity<?> downloadImage(@PathVariable long paperId) throws IOException {
		return ResponseEntity.ok(paperService.restoreImage(paperId));
	}
	
	@GetMapping(value = "/{paperId}/pdfs", produces = { MediaType.IMAGE_GIF_VALUE, MediaType.IMAGE_JPEG_VALUE,
			MediaType.IMAGE_PNG_VALUE, MediaType.APPLICATION_PDF_VALUE }) //tested
	public ResponseEntity<?> downloadPdf(@PathVariable long paperId) throws IOException {
		return ResponseEntity.ok(paperService.restorePdf(paperId));
	}
	
	@GetMapping("/topic/{topicId}") //tested
	public ResponseEntity<?> getPapersByTopicId(@PathVariable long topicId) throws IOException {
		return ResponseEntity.ok(paperService.getPapersByTopicId(topicId));
	}
	
	@PreAuthorize("hasRole('ROLE_AUTHOR')")//tested
	@GetMapping("/author/{authorId}")
	public ResponseEntity<?> getPapersByAuthorId(@PathVariable long authorId) throws IOException {
		return ResponseEntity.ok(paperService.getPapersByAuthorId(authorId));
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')") //tested
	@GetMapping("/status")
	public ResponseEntity<?> getPapersByAdminId() throws IOException {
		return ResponseEntity.ok(paperService.getPapersByStatus());
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')") //tested
	@PatchMapping("/updateStatus/{paperId}")
	public ResponseEntity<?> partialUpdatePaperStatus(@PathVariable long paperId,@RequestParam boolean status) throws IOException {
		return ResponseEntity.ok(new ApiResponse(paperService.partialUpdateStatus(paperId,status)));
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')") //tested
	@DeleteMapping("/{paperId}")
	public ResponseEntity<?> deletePaperDetails(@PathVariable long paperId) {
		return ResponseEntity.ok(new ApiResponse(paperService.deletePaper(paperId)));
	}
}
