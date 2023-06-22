package com.app.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name="papers")
public class Paper extends BaseEntity {
	@Column(length = 100,unique = true)
	private String title;
	@Column(name="pub_date")
	private LocalDate publishDate;
	private int visits;
	/*
	 * Check for: 
	 *                                                               1. visits 2. status 3. images 4. pdf 5. Dto
	 */
	@Column(length = 400)
	private String description;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="selected_topic_id",nullable = false)
	private Topic topic;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="author_id", nullable = false)
	private User author;
	@OneToMany(mappedBy = "paper",cascade = CascadeType.ALL)
	private List<Comment> comments=new ArrayList<>();
	@Column(length = 200)
	private String image;
	@Column(length = 200)
	private String pdfData;
	private boolean status;
}
