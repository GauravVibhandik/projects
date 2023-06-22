package com.app.dto;

import java.time.LocalDate;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
public class PaperRegistrationDTO extends BaseDto {
	
	@NotBlank(message = "Paper name is required")
	private String title;
	@NotNull(message = "Publish date must be supplied")
	@JsonFormat(pattern ="yyyy-MM-dd" )
	private LocalDate publishDate;
	@NotBlank(message = "contents must be supplied")
	private String description;	
	
}
