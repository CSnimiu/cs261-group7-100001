package com.example.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/form")
public class FormController {

	@Autowired
	private FormRepository formRepository;
	
	@DeleteMapping
	public List<Form> delAllForms(@RequestBody String Key){ //For DEV
		if (Key == "DEV") {
			formRepository.deleteAll();
		}
		else {
			//Something
		}
			
		return formRepository.findAll();
	}
	
	@GetMapping
	public List<Form> getAllForms(){
		return formRepository.findAll();
	}
	
	@PostMapping
	public Form createForm(@RequestBody Form form) {
		return formRepository.save(form);
	}
	
	

}

