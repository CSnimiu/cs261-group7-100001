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
        if (form.getID() == -1) {
            return formRepository.save(form);
        } else {
            return formRepository.findById(form.getID()).map(existingForm -> {
            	existingForm.setUser_id(form.getUser_id());
                existingForm.setPurpose(form.getPurpose());
                existingForm.setStage(form.getStage());
                existingForm.setC_code(form.getC_code());
                existingForm.setC_name(form.getC_name());
                existingForm.setSection(form.getSection());
                existingForm.setTime(form.getTime());
                existingForm.setC_unit(form.getC_unit());
                existingForm.setTeacher(form.getTeacher());
                existingForm.setReason(form.getReason());
                return formRepository.save(existingForm);
            }).orElseThrow(() -> new RuntimeException("error updating draft"));
        }
    }
	
	@PatchMapping("/{id},{stage}")
	public Form patchForm(@PathVariable Long id ,@PathVariable String stage) {
		Form target = formRepository.getReferenceById(id);
		if (stage != null) target.setStage(stage);

		return formRepository.save(target);
	}
	
}

