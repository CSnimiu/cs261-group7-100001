package com.example.crud;

import javax.annotation.PostConstruct;
import org.springframework.stereotype.Service;

@Service
public class MockDataService {

    private final UserRepository userRepository;

    public MockDataService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostConstruct
    public void init() {
        if (userRepository.count() == 0) {
        	User student = new User(
                    "นักศึกษา จำลอง",     // th_name
                    "Student mock",         // eng_name
                    "",   // birthday
                    "student.moc@dome.tu.ac.th", // email
                    "คณะวิทยาศาสตร์และเทคโนโลยี",  // faculty
                    "ภาควิชาวิทยาการคอมพิวเตอร์", // department
                    "student",      // type
                    "",				// year
                    "","","","","","",  // address
                    "",     // phone_num
                    "",  // advisor
                    "6609012345"      // user_name
                );

        	User professor1 = new User(
                    "อาจารย์ ทดสอบ",     // th_name
                    "Prof test",         // eng_name
                    "",   // birthday
                    "test@dome.tu.ac.th", // email
                    "",  // faculty
                    "", // department
                    "professor",      // type
                    "",				// year
                    "","","","","","",  // address
                    "",     // phone_num
                    "",  // advisor
                    "prof1"      // user_name
                );
        	
        	User professor2 = new User(
                    "อาจารย์ ทดสอบสอง",     // th_name
                    "Prof testtwo",         // eng_name
                    "",   // birthday
                    "test2@dome.tu.ac.th", // email
                    "",  // faculty
                    "", // department
                    "professor",      // type
                    "",				// year
                    "","","","","","",  // address
                    "",     // phone_num
                    "",  // advisor
                    "prof2"      // user_name
                );

        	userRepository.save(student);
            userRepository.save(professor1);
            userRepository.save(professor2);
        }
    }
}
