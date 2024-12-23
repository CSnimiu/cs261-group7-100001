package com.example.crud;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "accounts")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "th_name", nullable = false, columnDefinition = "NVARCHAR(255)")
    private String th_name;

    @Column(name = "eng_name", nullable = false)
    private String eng_name;

    @Column(name = "birthday", nullable = false)
    private String birthday;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "faculty", nullable = false, columnDefinition = "NVARCHAR(255)")
    private String faculty;

    @Column(name = "department", nullable = false, columnDefinition = "NVARCHAR(255)")
    private String department;

    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "year", nullable = true)
    private String year;

    @Column(name = "address", nullable = true, columnDefinition = "NVARCHAR(255)")
    private String address;

    @Column(name = "moo", nullable = true)
    private String moo;

    @Column(name = "road", nullable = true, columnDefinition = "NVARCHAR(255)")
    private String road;

    @Column(name = "district", nullable = true, columnDefinition = "NVARCHAR(255)")
    private String district;

    @Column(name = "province", nullable = true, columnDefinition = "NVARCHAR(255)")
    private String province;

    @Column(name = "zip_code", nullable = true)
    private String zip_code;

    @Column(name = "phone_num", nullable = true)
    private String phone_num;

    @Column(name = "advisor", nullable = true, columnDefinition = "NVARCHAR(255)")
    private String advisor;

    @Column(name = "user_name", nullable = false, unique = true)
    private String user_name;
	
 // Constructor
    public User() {}
    
    public User(String th_name, String eng_name, String birthday, String email,
                      String faculty, String department, String type, String year,
                      String address, String moo, String road, String district,
                      String province, String zip_code, String phone_num, String advisor,
                      String user_name) {
        this.th_name = th_name;
        this.eng_name = eng_name;
        this.birthday = birthday;
        this.email = email;
        this.faculty = faculty;
        this.department = department;
        this.type = type;
        this.year = year;
        this.address = address;
        this.moo = moo;
        this.road = road;
        this.district = district;
        this.province = province;
        this.zip_code = zip_code;
        this.phone_num = phone_num;
        this.advisor = advisor;
        this.user_name = user_name;
    }
    
	// Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTh_name() {
        return th_name;
    }

    public void setTh_name(String th_name) {
        this.th_name = th_name;
    }

    public String getEng_name() {
        return eng_name;
    }

    public void setEng_name(String eng_name) {
        this.eng_name = eng_name;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFaculty() {
        return faculty;
    }

    public void setFaculty(String faculty) {
        this.faculty = faculty;
    }
    
    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getMoo() {
        return moo;
    }

    public void setMoo(String moo) {
        this.moo = moo;
    }

    public String getRoad() {
        return road;
    }

    public void setRoad(String road) {
        this.road = road;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getZip_code() {
        return zip_code;
    }

    public void setZip_code(String zip_code) {
        this.zip_code = zip_code;
    }

    public String getPhone_num() {
        return phone_num;
    }

    public void setPhone_num(String phone_num) {
        this.phone_num = phone_num;
    }

    public String getAdvisor() {
        return advisor;
    }

    public void setAdvisor(String advisor) {
        this.advisor = advisor;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }
	
}
