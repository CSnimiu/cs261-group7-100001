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
	public List<Form> delAllForms(@RequestBody Long Key){
		if (Key == -1) {
			formRepository.deleteAll();
		}
		else {
			formRepository.delete(formRepository.getReferenceById(Key));
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
	
	@PatchMapping("/{id},{stage}")
	public Form patchForm(@PathVariable Long id ,@PathVariable String stage) {
		Form target = formRepository.getReferenceById(id);
		if (stage != null) target.setStage(stage);

		return formRepository.save(target);
	}
	
}

