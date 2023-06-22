package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "adr_tbl")
@NoArgsConstructor
@Setter
@Getter
@ToString(exclude = "owner")
public class Address extends BaseEntity {
	@Column(length = 50, name = "adr_line1")
	private String adrLine1;
	@Column(length = 50, name = "adr_line2")
	private String adrLine2;
	@Column(length = 20)
	private String city;
	@Column(length = 20)
	private String state;
	@Column(length = 20)
	private String country;
	@Column(length = 20, name = "zip_code")
	private String zipCode;
	@OneToOne
	@JoinColumn(name = "user_id", nullable = false)
	@MapsId
	private User owner;
}
