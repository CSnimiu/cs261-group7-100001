package com.example.crud;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "forms")
public class Form {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id ;
	
	@Column(name = "user_id", nullable = false)
	private Long user_id ;
	
	@Column(name = "purpose", nullable = false)
	private String purpose ;
	
	@Column(name = "stage", nullable = false)
	private String stage ;
	
	@Column(name = "c_code", nullable = false)
	private String c_code ;
	
	@Column(name = "c_name", nullable = false, columnDefinition = "NVARCHAR(255)")
	private String c_name ;
	
	@Column(name = "section", nullable = false)
	private String section ;
	
	@Column(name = "time", nullable = false)
	private String time ;
	
	@Column(name = "c_unit", nullable = false)
	private double c_unit ;
	
	@Column(name = "teacher", nullable = false, columnDefinition = "NVARCHAR(255)")
	private String teacher ;
	
	@Column(name = "reason", nullable = false, columnDefinition = "NVARCHAR(1023)")
	private String reason ;
	
	public long getID() {
		return id == null ? -1 : id;
    }
    
	public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }


    public String getStage() {
        return stage;
    }

    public void setStage(String stage) {
        this.stage = stage;
    }


    public String getC_code() {
        return c_code;
    }

    public void setC_code(String c_code) {
        this.c_code = c_code;
    }

    public String getC_name() {
        return c_name;
    }

    public void setC_name(String c_name) {
        this.c_name = c_name;
    }


    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }


    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public double getC_unit() {
        return c_unit;
    }

    public void setC_unit(double c_unit) {
        this.c_unit = c_unit;
    }

    public String getTeacher() {
        return teacher;
    }

    public void setTeacher(String teacher) {
        this.teacher = teacher;
    }


    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}

