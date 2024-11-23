package com.example.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import lombok.extern.java.Log;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

	@Autowired
	private UserRepository userRepository;
	
	@DeleteMapping("/{Key}")
	public List<User> delAllUsers(@PathVariable int Key){ //For DEV
		if (Key == 1234567) {
			userRepository.deleteAll();
		}
		else {
			//Something
		}
			
		return userRepository.findAll();
	}
	
	@GetMapping
	public List<User> getAllUsers(){
		return userRepository.findAll();
	}
	
	@PostMapping
	public User createUser(@RequestBody User user) {	
		return userRepository.save(user);
	}
	
	@PatchMapping("/{id}")
	public User patchUser(@PathVariable Long id, @RequestBody User user) {
		User target = userRepository.getReferenceById(id);
		if (user.getAddress() != null) target.setAddress(user.getAddress());
		if (user.getAdvisor() != null) target.setAdvisor(user.getAdvisor());
		if (user.getBirthday() != null) target.setBirthday(user.getBirthday());
		if (user.getDistrict() != null) target.setDistrict(user.getDistrict());
		if (user.getEmail() != null) target.setEmail(user.getEmail());
		if (user.getEng_name()!= null) target.setEng_name(user.getEng_name());
		if (user.getFaculty() != null) target.setFaculty(user.getFaculty());
		if (user.getDepartment() != null) target.setDepartment(user.getDepartment());
		if (user.getMoo() != null) target.setMoo(user.getMoo());
		if (user.getPhone_num() != null) target.setPhone_num(user.getPhone_num());
		if (user.getProvince() != null) target.setProvince(user.getProvince());
		if (user.getRoad() != null) target.setRoad(user.getRoad());
		if (user.getTh_name() != null) target.setTh_name(user.getTh_name());
		if (user.getType() != null) target.setType(user.getType());
		if (user.getUser_name() != null) target.setUser_name(user.getUser_name());
		if (user.getYear() != null) target.setYear(user.getYear());
		if (user.getZip_code() != null) target.setZip_code(user.getZip_code());

		return userRepository.save(target);
	}
}

