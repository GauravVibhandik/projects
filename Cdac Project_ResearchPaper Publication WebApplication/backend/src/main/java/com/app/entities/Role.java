package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "roles")
@NoArgsConstructor
@Getter
@Setter
@ToString

public class Role extends BaseEntity {
	
	@Enumerated(EnumType.STRING)
	@Column(name = "role_name", length = 20)
	private UserRole roleName;
	
}
