
package com.app.entities;

import javax.persistence.*;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "comments", uniqueConstraints = @UniqueConstraint(columnNames = { "papr_id", "usr_id" }))
public class Comment extends BaseEntity {
	@Length(min = 4,max=200,message = "Comment too Short")
	@Column(name = "comment_text",length = 400)
	private String commentText;
	@ManyToOne
	@JsonIgnore
	@JoinColumn(name = "papr_id", nullable = false)
	private Paper paper;
	@ManyToOne
	@JsonIgnore
	@JoinColumn(name = "usr_id", nullable = false)
	private User user;
	
	@Override
	public String toString() {
		return "Comment ID " + getId() + " [commentText=" + commentText + "]";
	}

}
