package com.example.crud;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;


@Data
@Entity
@Table(name="accounts")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id ; 
	
	@Column(name = "th_name", nullable = false)
	private String th_name ; 
	
	@Column(name = "eng_name", nullable = false)
	private String eng_name ;
	
	@Column(name = "birthday", nullable = false)
	private String birthday ; 
	
	@Column(name = "email", nullable = false)
	private String email ;
	
	@Column(name = "faculty", nullable = false)
	private String faculty ;
	
	@Column(name = "type", nullable = false)
	private String type ;
	
	@Column(name = "year", nullable = false)
	private String year ;
	
	@Column(name = "address", nullable = false)
	private String address ;
	
	@Column(name = "moo", nullable = false)
	private String moo ;
	
	@Column(name = "road", nullable = false)
	private String road ;
	
	@Column(name = "district", nullable = false)
	private String district ;
	
	@Column(name = "province", nullable = false)
	private String province ;
	
	@Column(name = "zip_code", nullable = false)
	private String zip_code ;
	
	@Column(name = "phone_num", nullable = false)
	private String phone_num ;
	
	@Column(name = "advisor", nullable = false)
	private String advisor ;
	
	@Column(name = "user_name", nullable = false)
	private String user_name ;
	
}
