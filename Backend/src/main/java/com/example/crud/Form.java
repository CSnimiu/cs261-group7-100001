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
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "requirement", nullable = false)
    private String requirement;

    @Column(name = "stage", nullable = false)
    private String stage;

    @Column(name = "courseCode", nullable = false)
    private String courseCode;

    @Column(name = "courseName", nullable = false)
    private String courseName;

    @Column(name = "section", nullable = false)
    private String section;

    @Column(name = "courseTime", nullable = false)
    private String courseTime;

    @Column(name = "courseUnit", nullable = false)
    private String courseUnit;

    @Column(name = "teacher", nullable = false)
    private String teacher;

    @Column(name = "note", nullable = true)
    private String note;
    
    @Column(name = "semester", nullable = true)
    private String semester;
    
    @Column(name = "year", nullable = true)
    private String year;

    // Getter and Setter for id
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Getter and Setter for userId
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    // Getter and Setter for requirement
    public String getRequirement() {
        return requirement;
    }

    public void setRequirement(String requirement) {
        this.requirement = requirement;
    }

    public String getStage() {
        return stage;
    }

    public void setStage(String stage) {
        this.stage = stage;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String c_code) {
        this.courseCode = c_code;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String c_code) {
        this.courseName = c_code;
    }

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public String getCourseTime() {
        return courseTime;
    }

    public void setCourseTime(String time) {
        this.courseTime = time;
    }

    public String getCourseUnit() {
        return courseUnit;
    }

    public void setCourseUnit(String courseUnit) {
        this.courseUnit = courseUnit;
    }

    public String getTeacher() {
        return teacher;
    }

    public void setTeacher(String teacher) {
        this.teacher = teacher;
    }
    
 // Getter and Setter for teacher
    public String getSemester() {
        return semester;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }

    // Getter and Setter for note
    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }
    
    @Column(name = "th_name", nullable = false)
    private String th_name;

    @Column(name = "eng_name", nullable = false)
    private String eng_name;

    @Column(name = "birthday", nullable = false)
    private String birthday;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "faculty", nullable = false)
    private String faculty;

    @Column(name = "department", nullable = false)
    private String department;

    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "address", nullable = true)
    private String address;

    @Column(name = "moo", nullable = true)
    private String moo;

    @Column(name = "road", nullable = true)
    private String road;

    @Column(name = "district", nullable = true)
    private String district;

    @Column(name = "province", nullable = true)
    private String province;

    @Column(name = "zip_code", nullable = true)
    private String zip_code;

    @Column(name = "phone_num", nullable = true)
    private String phone_num;

    @Column(name = "advisor", nullable = true)
    private String advisor;

    @Column(name = "user_name", nullable = false, unique = true)
    private String user_name;
	
	// Getters and Setters

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
