package com.app.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "users")
@Getter
@Setter
@ToString(exclude = {"role","cards"})
@NoArgsConstructor
public class User extends BaseEntity {

	@Column(name = "first_name", length = 20)
	private String firstName;
	@Column(name = "last_name", length = 30)
	private String lastName;
	@Column(length = 30, unique = true)
	private String email;
	@Column(length = 400, nullable = false)
	private String password;
	@ManyToOne
	@JoinColumn(name = "role_id", nullable = false)
	private Role role;
	@JsonIgnore
	@ElementCollection
	@CollectionTable(name = "user_cards",joinColumns = @JoinColumn(name="u_id"))
	private List<Card> cards=new ArrayList<>();
	public User(String firstName, String lastName, String email, String password) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
	}
	
	
	
}
