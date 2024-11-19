package com.example.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class UserController {

	@Autowired
	private UserRepository userRepository;
	
	@DeleteMapping
	public List<User> delAllUsers(@RequestBody String Key){ //For DEV
		if (Key == "DEV") {
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
	
	

}

