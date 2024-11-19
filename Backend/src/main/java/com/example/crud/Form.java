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
@Table(name="forms")
public class Form {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id ;
	
	@Column(name = "user_id", nullable = false)
	private Long user_id ;
	
	@Column(name = "requirement", nullable = false)
	private String requirement ;
	
	@Column(name = "stage", nullable = false)
	private String stage ;
	
	@Column(name = "c_code", nullable = false)
	private String c_code ;
	
	@Column(name = "c_name", nullable = false)
	private String c_name ;
	
	@Column(name = "section", nullable = false)
	private String section ;
	
	@Column(name = "time", nullable = false)
	private String time ;
	
	@Column(name = "c_unit", nullable = false)
	private double c_unit ;
	
	@Column(name = "teacher", nullable = false)
	private String teacher ;
	
	@Column(name = "note", nullable = false)
	private String note ;
	
	public String getStage() {
        return stage;
    }

    public void setStage(String stage) {
        this.stage = stage;
    }
	
}