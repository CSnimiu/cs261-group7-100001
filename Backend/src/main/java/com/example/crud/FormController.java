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
            return ResponseEntity.badRequest().body("Invalid key parameter.");
        }
    }

    // Get all forms
    @GetMapping
    public ResponseEntity<List<Form>> getAllForms() {
        List<Form> forms = formRepository.findAll();
        return ResponseEntity.ok(forms);
    }

    // Create a new form
    @PostMapping
    public ResponseEntity<?> createForm(@RequestBody Form form) {
        // ตรวจสอบข้อมูลว่าครบถ้วนหรือไม่
        if (form.getUserId() == null || form.getRequirement() == null || form.getStage() == null ||
            form.getCourseCode() == null || form.getCourseName() == null || form.getSection() == null ||
            form.getCourseTime() == null || form.getCourseUnit() == null || form.getTeacher() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing required form fields.");
        }      

        
        Form createdForm = formRepository.save(form);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdForm);
    }

    // Update the stage of an existing form
    @PatchMapping("/{id}")
    public ResponseEntity<?> patchForm(@PathVariable Long id, @RequestParam(required = false) String stage) {
        Optional<Form> optionalTarget = formRepository.findById(id);
        if (optionalTarget.isPresent()) {
            Form target = optionalTarget.get();
            if (stage != null && !stage.isEmpty()) {
                target.setStage(stage);
                Form updatedForm = formRepository.save(target);
                return ResponseEntity.ok(updatedForm);
            } else {
                return ResponseEntity.badRequest().body("Stage parameter is missing or empty.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Form not found with ID: " + id);
        }
    }
	
	@PatchMapping("/{id},{stage}")
	public Form patchForm(@PathVariable Long id ,@PathVariable String stage) {
		Form target = formRepository.getReferenceById(id);
		if (stage != null) target.setStage(stage);

		return formRepository.save(target);
	}
	
}

