package com.example.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.extern.java.Log;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Delete all users or specific user (for development)
    @DeleteMapping("/{Key}")
    public ResponseEntity<?> deleteAllUsers(@PathVariable int Key) {
        if (Key == 1234567) {
            userRepository.deleteAll();
            return ResponseEntity.ok("All users deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid key. Deletion not allowed.");
        }
    }

    // Get all users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }
    
    @GetMapping("/{user_name}")
    public ResponseEntity<?> getUserByUserName(@PathVariable String user_name) {
        Optional<User> user = userRepository.findByUserName(user_name);

        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with user_name: " + user_name);
        }

        return ResponseEntity.ok(user.get());
    }

    // Create a new user
    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
            User createdUser = userRepository.save(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating user: " + e.getMessage());
        }
    }

    // Update (patch) a user using user_name
    @PatchMapping("/{user_name}")
    public ResponseEntity<?> patchUser(@PathVariable String user_name, @RequestBody User user) {
        Optional<User> optionalTarget = userRepository.findByUserName(user_name);

        if (optionalTarget.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with user_name " + user_name + " not found.");
        }

        User target = optionalTarget.get();

        // อัปเดตข้อมูลที่ส่งมา
        if (user.getAddress() != null) target.setAddress(user.getAddress());
        if (user.getAdvisor() != null) target.setAdvisor(user.getAdvisor());
        if (user.getBirthday() != null) target.setBirthday(user.getBirthday());
        if (user.getDistrict() != null) target.setDistrict(user.getDistrict());
        if (user.getEmail() != null) target.setEmail(user.getEmail());
        if (user.getEng_name() != null) target.setEng_name(user.getEng_name());
        if (user.getFaculty() != null) target.setFaculty(user.getFaculty());
        if (user.getDepartment() != null) target.setDepartment(user.getDepartment());
        if (user.getMoo() != null) target.setMoo(user.getMoo());
        if (user.getPhone_num() != null) target.setPhone_num(user.getPhone_num());
        if (user.getProvince() != null) target.setProvince(user.getProvince());
        if (user.getRoad() != null) target.setRoad(user.getRoad());
        if (user.getTh_name() != null) target.setTh_name(user.getTh_name());
        if (user.getYear() != null) target.setYear(user.getYear());
        if (user.getZip_code() != null) target.setZip_code(user.getZip_code());

        // Do not allow updates to critical fields unless explicitly enabled
        // Uncomment the lines below if you want to allow updates to user_name or type:
        // if (user.getUser_name() != null) target.setUser_name(user.getUser_name());
        // if (user.getType() != null) target.setType(user.getType());

        // Save changes
        User updatedUser = userRepository.save(target);

        // Return updated user
        return ResponseEntity.ok(updatedUser);
    }
}
