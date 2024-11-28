function togglePassword() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eye-icon');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text'; // แสดงรหัสผ่าน
        eyeIcon.src = 'img/eye-open-icon.png';
        eyeIcon.alt = 'Hide Password';
    } else {
        passwordInput.type = 'password'; // ซ่อนรหัสผ่าน
        eyeIcon.src = 'img/eye-close-icon.png';
        eyeIcon.alt = 'Show Password';
    }
}

/*******************************
 * ข้อมูล Mock สำหรับการพัฒนา
 *******************************/
const mockStudents = [
    { username: 'student', password: '123456', type: 'student' },
];

const mockProfessors = [
    { username: 'professor1', password: '123456', type: 'professor' },
    { username: 'professor2', password: '123456', type: 'professor' },
];


/******************************* 
* Submit Login Form
/*******************************/
function submitLogin() {
   const userName = document.getElementById('username')?.value;
   const password = document.getElementById('password')?.value;
   const checkDiv = document.getElementById('check');

   if (!userName || !password) {
       checkDiv.innerText = '*กรุณากรอกชื่อผู้ใช้และรหัสผ่าน*';
       return;
   }

   // ตรวจสอบ Mock Data ก่อน
   const validUser = mockStudents.find(user => user.username === userName && user.password === password)
       || mockProfessors.find(user => user.username === userName && user.password === password);

   if (validUser) {
       console.log('Login Successful with Mock Data:', validUser);
       localStorage.setItem('user', JSON.stringify(validUser)); // บันทึกข้อมูลผู้ใช้ลง LocalStorage
       redirectUser(validUser.type); // เปลี่ยนเส้นทางตามประเภทผู้ใช้
       return;
   }
   

   // ถ้าไม่พบข้อมูลใน Mock Data ให้เรียก API
   console.log('Checking API for user authentication...');
   authenticateWithAPI(userName, password, checkDiv);
}


/*******************************
* Authenticate with API
*******************************/
function authenticateWithAPI(userName, password, checkDiv) {
   fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json',
           'Application-Key': 'TU6b385dc1f8327e133ed355505488df04cd80b11ff6273eb291fa94ad1a05c456116ca973efcb839f730143f2cb931d4b'
       },
       body: JSON.stringify({ UserName: userName, PassWord: password }),
   })
       .then(async response => {
           if (!response.ok) {
               const errorMessage = await response.text();
               throw new Error(errorMessage || 'เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์');
           }

           const result = await response.json();
           console.log('Response Body:', result);

           if (result.status) {
               console.log('Login Successful with API:', result);
               addToDB(result); // เพิ่มผู้ใช้ในฐานข้อมูล
           } else {
               checkDiv.innerText = 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง!';
           }
       })
       .catch(error => {
           console.error('Error connecting to API:', error);
           checkDiv.innerText = 'เกิดข้อผิดพลาดในการเชื่อมต่อกับ API';
       });
}

/*******************************
* Redirect User by Type
*******************************/
function redirectUser(userType) {
   if (userType === 'student') {
       window.location.href = 'main.html';
   } else if (userType === 'professor') {
       window.location.href = 'professormain.html';
   } else {
       console.error('ประเภทผู้ใช้ไม่ถูกต้อง:', userType);
   }
}


function ownedAccount(data,user) {
    let OwnedAccount = null;
    for (i in data) {
        if (data[i].user_name === user.username) {
            OwnedAccount = data[i];
            break;
        }
    }
    console.log(OwnedAccount);
    return OwnedAccount;
}

function addToDB(user) {
    fetch('http://localhost:8080/api/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (ownedAccount(data, user) != null) {
            console.log("Own");
            user = ownedAccount(data, user);
            localStorage.setItem('user', JSON.stringify(user));
            window.location.href = 'main.html';
        }
        else {
            fetch('http://localhost:8080/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "email": user.email,
                    "type": user.type,
                    "eng_name": user.displayname_en,
                    "th_name": user.displayname_th,
                    "faculty": user.faculty,
                    "department": user.department,
                    "birthday": "",
                    "year": "",
                    "address": "",
                    "moo": "",
                    "road": "",
                    "district": "",
                    "province": "",
                    "zip_code": "",
                    "phone_num": "",
                    "advisor": "",
                    "user_name": user.username
                })
            })
            .then(response => response.json())
            .then(data => {
                user = data;
                localStorage.setItem('user', JSON.stringify(user));
                window.location.href = 'main.html';
            })
        }
       
    })


}

/***************(Normal logout function has been moved to alert.js)***************/

// ฟังก์ชั่น logout สำหรับ session timeout logout
function sessionTimeoutLogout() {
    localStorage.removeItem('user'); // ลบข้อมูลผู้ใช้ (หากมี)
    window.location.href = "login.html"; // เปลี่ยนเส้นทางไปยังหน้า login
    console.log('Session timed out. Logging out...'); // ตรวจสอบว่าฟังก์ชันถูก
}

document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const currentPath = window.location.pathname;

    if (!user && !currentPath.includes('login.html')) {
        window.location.href = 'login.html';
    }

    if (currentPath.includes('profile.html')) {
        populateProfile(user);

        // เพิ่ม Event Listener สำหรับปุ่มบันทึกข้อมูล
        document.getElementById("save-profile").addEventListener("click", saveProfile);
    }
});

/*******************************
 * แสดงข้อมูลผู้ใช้ใน profile.html
 *******************************/
function populateProfile(user) {
    document.getElementById("info-box-thname").value = user.th_name.split(" ")[0] || "";
    document.getElementById("info-box-thlname").value = user.th_name.split(" ")[1] || "";
    document.getElementById("info-box-enname").value = user.eng_name.split(" ")[0] || "";
    document.getElementById("info-box-enlname").value = user.eng_name.split(" ")[1] || "";
    document.getElementById("info-box-faculty").value = user.faculty || "";
    document.getElementById("info-box-major").value = user.department || "";
    document.getElementById("info-box-id").value = user.user_name || "";
    document.getElementById("info-box-dob").value = user.birthday || "";
    document.getElementById("info-box-year").value = user.year || "";
    document.getElementById("info-box-address").value = user.address || "";
    document.getElementById("info-box-moo").value = user.moo || "";
    document.getElementById("info-box-subdistrict").value = user.road || "";
    document.getElementById("info-box-district").value = user.district || "";
    document.getElementById("info-box-state").value = user.province || "";
    document.getElementById("info-box-postcode").value = user.zip_code || "";
    document.getElementById("info-box-email").value = user.email || "";
    document.getElementById("info-box-phone").value = user.phone_num || "";
    document.getElementById("info-box-advisor").value = user.advisor || "";
}

function fetchProfile(user_name) {
    fetch(`http://localhost:8080/api/user/${user_name}?timestamp=${Date.now()}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Failed to fetch profile data");
        })
        .then(user => {
            console.log("Fetched profile:", user);
            populateProfile(user); // แสดงข้อมูลในหน้า Profile
        })
        .catch(error => {
            console.error("Error fetching profile:", error);
        });
}


/*******************************
 * บันทึกข้อมูลที่แก้ไขลงใน Database
 *******************************/
function saveProfile() {
    const updatedData = {
        th_name: document.getElementById("info-box-thname").value + " " + document.getElementById("info-box-thlname").value,
        eng_name: document.getElementById("info-box-enname").value + " " + document.getElementById("info-box-enlname").value,
        faculty: document.getElementById("info-box-faculty").value,
        department: document.getElementById("info-box-major").value,
        user_name: document.getElementById("info-box-id").value,
        birthday: document.getElementById("info-box-dob").value,
        year: document.getElementById("info-box-year").value,
        address: document.getElementById("info-box-address").value,
        moo: document.getElementById("info-box-moo").value,
        road: document.getElementById("info-box-subdistrict").value,
        district: document.getElementById("info-box-district").value,
        province: document.getElementById("info-box-state").value,
        zip_code: document.getElementById("info-box-postcode").value,
        email: document.getElementById("info-box-email").value,
        phone_num: document.getElementById("info-box-phone").value,
        advisor: document.getElementById("info-box-advisor").value,
    };

    fetch(`http://localhost:8080/api/user/${updatedData.user_name}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Failed to update profile");
        })
        .then(updatedUser => {
            console.log("Profile updated successfully:", updatedUser);
            // เรียกข้อมูลล่าสุดมาแสดงผล
            fetchProfile(updatedData.user_name);
            alert("ข้อมูลได้รับการบันทึกสำเร็จ!");
        })
        .catch(error => {
            console.error("Error updating profile:", error);
            alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
        });
}

function fetchProfile(user_name) {
    fetch(`http://localhost:8080/api/user/${user_name}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Failed to fetch profile data");
        })
        .then(user => {
            console.log("Fetched profile:", user);
            populateProfile(user);
        })
        .catch(error => {
            console.error("Error fetching profile:", error);
        });
}

// Event Listener: ตรวจสอบผู้ใช้งานและโหลดข้อมูลโปรไฟล์เมื่อเปิดหน้า
document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const currentPath = window.location.pathname;

    if (!user && !currentPath.includes('login.html')) {
        window.location.href = 'login.html';
    }

    if (currentPath.includes('main.html')) {
        createPendingModal();
    }
    if (currentPath.includes('professorMain.html')) {
        createProfessorModal()
    }
    

    if (currentPath.includes('profile.html')) {
        fetchProfile(user.user_name); // โหลดข้อมูลโปรไฟล์
        document.getElementById("save-profile").addEventListener("click", saveProfile); // ผูกฟังก์ชันบันทึกข้อมูลกับปุ่ม
    }
});

// กำหนดเวลา timeout (in milliseconds). : minutes * seconds * milliseconds
const sessionTimeout = 15 * 60 * 1000; // 15 minutes
let timeoutId;

// Function to reset the session timeout
function resetTimeout() {
    clearTimeout(timeoutId);
    startTimeout();
}

// Function to start the timeout timer
function startTimeout() {
    timeoutId = setTimeout(() => {
        sessionTimeoutLogout(); // หลังจาก timeout แล้วจะนำ user กลับไปหน้า login
    }, sessionTimeout);
}

// Reset ตัวจับเวลาเมื่อมี interaction
document.addEventListener("mousemove", resetTimeout);
document.addEventListener("keydown", resetTimeout);
document.addEventListener("click", resetTimeout);
document.addEventListener("scroll", resetTimeout);

// Start the session timeout countdown
startTimeout();


function Cancel() {
    openCancelModal(); // Open the modal when the "ยกเลิก" button is clicked
}

function createCancelModal() {
    const modalHtml = `
        <div id="CancelModal" class="modal">
            <div class="modal-content">
                <h2>คำร้องยังไม่ได้บันทึก</h2>
                <p>ท่านต้องการออกจากหน้าแบบฟอร์ม ใช่หรือไม่</p>
                <button class="cancel-btn" onclick="closeCancelModal()">ยกเลิก</button>
                <button class="confirm-btn" onclick="confirmCancel()">ยืนยัน</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function openCancelModal() {
    const modal = document.getElementById("CancelModal");
    if (!modal) {
        createCancelModal(); // Create the modal if it doesn’t exist
    }
    document.getElementById("CancelModal").style.display = "flex";
}

function closeCancelModal() {
    const modal = document.getElementById("CancelModal");
    if (modal) {
        modal.style.display = "none";
    }
}

function confirmCancel() {
    window.location.href = "../main.html"; // Redirect to the main page
    console.log("Form submission canceled...");
}

function updateProfile() {
    
}

/*******************************
Submit Button
*******************************/
function Submit() {
    openSubmitModal(); // Open the modal when the "Submit" button is clicked
}

function validateForm() {
    const requiredFields = document.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error'); // Highlight the field with error
            isValid = false;
        } else {
            field.classList.remove('error');
        }
    });

    return isValid;
}

function createProfessorModal() {
    fetch('http://localhost:8080/api/form', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },

    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const user = JSON.parse(localStorage.getItem('user'));
            for (let i in data) {
                const dataI = data[i];
                if (dataI.advisor != user.username) { continue; }
                console.log(dataI.stage);
                if (dataI.stage === "Draft") { continue; }
                if (dataI.type === "Request") {
                    dataI.type = dataI.requirement;
                }
                if (dataI.requirement === "จดทะเบียนล่าช้า/เพิ่มล่าช้า") {
                    const modalHtml = `
                        <div class="row req-status-menu-container" id="pending-status-menu-container">
                            <div class="req-menu">
                                <h4 id="pending-status-name">${dataI.type}</h4>
                                <h4 class="req-status-date" id="pending-status-date">${dataI.courseTime}</h4>
                            </div>
                        </div>
                        `;
                    document.getElementById("จดทะเบียนล่าช้า/เพิ่มล่าช้า").insertAdjacentHTML('afterend', modalHtml);
                }
                else if (dataI.requirement === "ขอจดทะเบียนศึกษารายวิชาข้ามหลักสูตร") {
                    const modalHtml = `
                        <div class="row req-status-menu-container" id="pending-status-menu-container">
                            <div class="req-menu">
                                <h4 id="pending-status-name">${dataI.type}</h4>
                                <h4 class="req-status-date" id="pending-status-date">${dataI.courseTime}</h4>
                            </div>
                        </div>
                        `;
                    document.getElementById("ขอจดทะเบียนศึกษารายวิชาข้ามหลักสูตร").insertAdjacentHTML('afterend', modalHtml);
                }
                else if (dataI.requirement === "ขอถอนรายวิชา") {
                    const modalHtml = `
                        <div class="row req-status-menu-container" id="pending-status-menu-container">
                            <div class="req-menu">
                                <h4 id="pending-status-name">${dataI.type}</h4>
                                <h4 class="req-status-date" id="pending-status-date">${dataI.courseTime}</h4>
                            </div>
                        </div>
                        `;
                    document.getElementById("ขอถอนรายวิชา").insertAdjacentHTML('afterend', modalHtml);
                }
            }
        })

}

function createPendingModal() {
    fetch('http://localhost:8080/api/form', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },

    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            for (let i in data) {
                const dataI = data[i];
                if (dataI.type === "Request") {
                    dataI.type = dataI.requirement;
                }
                if (dataI.stage === "Pending") {                  
                    const modalHtml = `
                        <div class="row req-status-menu-container" id="pending-status-menu-container">
                            <div class="req-menu">
                                <h4 id="pending-status-name">${dataI.type}</h4>
                                <h4 class="req-status-date" id="pending-status-date">${dataI.courseTime}</h4>
                            </div>
                        </div>
                        `;
                    document.getElementById("pending").insertAdjacentHTML('afterend', modalHtml);
                }
                else if (dataI.stage === "Approve") {
                    const modalHtml = `
                        <div class="row req-status-menu-container" id="pending-status-menu-container">
                            <div class="req-menu">
                                <h4 id="pending-status-name">${dataI.type}</h4>
                                <h4 class="req-status-date" id="pending-status-date">${dataI.courseTime}</h4>
                            </div>
                        </div>
                        `;
                    document.getElementById("approve").insertAdjacentHTML('afterend', modalHtml);
                }
                else if (dataI.stage === "Draft") {
                    const modalHtml = `
                        <div class="row req-status-menu-container" id="pending-status-menu-container">
                            <div class="req-menu">
                                <h4 id="pending-status-name">${dataI.type}</h4>
                                <h4 class="req-status-date" id="pending-status-date">${dataI.courseTime}</h4>
                            </div>
                        </div>
                        `;
                    document.getElementById("draft").insertAdjacentHTML('afterend', modalHtml);
                }
            }
        })
    
}

function createSubmitModal() {
    const modalHtml = `
        <div id="SubmitModal" class="modal">
            <div class="modal-content">
                <h2>ยื่นคำร้อง</h2>
                <p>ท่านต้องการยื่นคำร้อง ใช่หรือไม่</p>
                <button class="cancel-btn" onclick="closeSubmitModal()">ยกเลิก</button>
                <button class="confirm-btn" onclick="confirmSubmit()">ยืนยัน</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function openSubmitModal() {
    const modal = document.getElementById("SubmitModal");
    if (!modal) {
        createSubmitModal(); // Create the modal if it doesn’t exist
    }
    document.getElementById("SubmitModal").style.display = "flex";
}

function closeSubmitModal() {
    const modal = document.getElementById("SubmitModal");
    if (modal) {
        modal.style.display = "none";
    }
}

function confirmSubmit() {
    alert("Form submitted successfully!");
    closeSubmitModal(); // Close the modal after confirming
    console.log("Form submission confirmed...");
}

function sendFormDraftData() {

    if (document.getElementById("resignForm")) {
        const formData = {
            th_name: document.getElementById("info-box-thname").value + " " + document.getElementById("info-box-thlname").value,
            eng_name: document.getElementById("info-box-enname").value + " " + document.getElementById("info-box-enlname").value,
            faculty: document.getElementById("info-box-faculty").value,
            department: document.getElementById("info-box-major").value,
            user_name: document.getElementById("info-box-id").value,
            birthday: "",
            year: document.getElementById("year").value,
            address: document.getElementById("info-box-address").value,
            moo: document.getElementById("info-box-moo").value,
            road: document.getElementById("info-box-subdistrict").value,
            district: document.getElementById("info-box-district").value,
            province: document.getElementById("info-box-state").value,
            zip_code: document.getElementById("info-box-postcode").value,
            email: document.getElementById("info-box-email").value,
            phone_num: document.getElementById("info-box-phone").value,
            advisor: document.getElementById("info-box-advisor").value,
            userId: 0,
            requirement: document.getElementById("requirement").value,
            stage: "Draft",
            courseCode: "",
            courseName: "",
            section: "",
            courseTime: "",
            courseUnit: "",
            teacher: "",
            note: document.getElementById("note").value,
            semester: document.getElementById("semester").value,
            type: "Resign"
        }

        console.log(formData);

        fetch("http://localhost:8080/api/form", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (response.ok) {
                    console.log("Form submitted successfully.");
                } else {
                    throw new Error("Failed to submit form.");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("เกิดข้อผิดพลาดในการส่งคำร้อง กรุณาลองใหม่อีกครั้ง");
            });
        return;
    }
    else if (document.getElementById("requestForm")) {
        const formData = {
            th_name: document.getElementById("info-box-thname").value + " " + document.getElementById("info-box-thlname").value,
            eng_name: document.getElementById("info-box-enname").value + " " + document.getElementById("info-box-enlname").value,
            faculty: document.getElementById("info-box-faculty").value,
            department: document.getElementById("info-box-major").value,
            user_name: document.getElementById("info-box-id").value,
            birthday: "",
            year: document.getElementById("info-box-year").value,
            address: document.getElementById("info-box-address").value,
            moo: document.getElementById("info-box-moo").value,
            road: document.getElementById("info-box-subdistrict").value,
            district: document.getElementById("info-box-district").value,
            province: document.getElementById("info-box-state").value,
            zip_code: document.getElementById("info-box-postcode").value,
            email: document.getElementById("info-box-email").value,
            phone_num: document.getElementById("info-box-phone").value,
            advisor: document.getElementById("info-box-advisor").value,
            userId: 0,
            requirement: document.getElementById("requirement").value,
            stage: "Draft",
            courseCode: document.getElementById("courseCode").value,
            courseName: document.getElementById("courseName").value,
            section: document.getElementById("section").value,
            courseTime: document.getElementById("time").value,
            courseUnit: document.getElementById("courseUnit").value,
            teacher: document.getElementById("teacher").value,
            note: document.getElementById("note").value,
            semester: "",
            type: "Request"
        }

        console.log(formData);

        fetch("http://localhost:8080/api/form", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (response.ok) {
                    console.log("Form submitted successfully.");
                } else {
                    throw new Error("Failed to submit form.");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("เกิดข้อผิดพลาดในการส่งคำร้อง กรุณาลองใหม่อีกครั้ง");
            });
        return;
    }
}
function sendFormData() {

    if (document.getElementById("resignForm")) {
        const formData = {
            th_name: document.getElementById("info-box-thname").value + " " + document.getElementById("info-box-thlname").value,
            eng_name: document.getElementById("info-box-enname").value + " " + document.getElementById("info-box-enlname").value,
            faculty: document.getElementById("info-box-faculty").value,
            department: document.getElementById("info-box-major").value,
            user_name: document.getElementById("info-box-id").value,
            birthday: "",
            year: document.getElementById("year").value,
            address: document.getElementById("info-box-address").value,
            moo: document.getElementById("info-box-moo").value,
            road: document.getElementById("info-box-subdistrict").value,
            district: document.getElementById("info-box-district").value,
            province: document.getElementById("info-box-state").value,
            zip_code: document.getElementById("info-box-postcode").value,
            email: document.getElementById("info-box-email").value,
            phone_num: document.getElementById("info-box-phone").value,
            advisor: document.getElementById("info-box-advisor").value,
            userId: 0,
            requirement: document.getElementById("requirement").value,
            stage: "Pending",
            courseCode: "",
            courseName: "",
            section: "",
            courseTime: "",
            courseUnit: "",
            teacher: "",
            note: document.getElementById("note").value,
            semester: document.getElementById("semester").value,
            type: "Resign"
        }

        console.log(formData);

        fetch("http://localhost:8080/api/form", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (response.ok) {
                    console.log("Form submitted successfully.");
                } else {
                    throw new Error("Failed to submit form.");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("เกิดข้อผิดพลาดในการส่งคำร้อง กรุณาลองใหม่อีกครั้ง");
            });
        return;
    }
    else if (document.getElementById("requestForm")) {
        const formData = {
            th_name: document.getElementById("info-box-thname").value + " " + document.getElementById("info-box-thlname").value,
            eng_name: document.getElementById("info-box-enname").value + " " + document.getElementById("info-box-enlname").value,
            faculty: document.getElementById("info-box-faculty").value,
            department: document.getElementById("info-box-major").value,
            user_name: document.getElementById("info-box-id").value,
            birthday: "",
            year: document.getElementById("info-box-year").value,
            address: document.getElementById("info-box-address").value,
            moo: document.getElementById("info-box-moo").value,
            road: document.getElementById("info-box-subdistrict").value,
            district: document.getElementById("info-box-district").value,
            province: document.getElementById("info-box-state").value,
            zip_code: document.getElementById("info-box-postcode").value,
            email: document.getElementById("info-box-email").value,
            phone_num: document.getElementById("info-box-phone").value,
            advisor: document.getElementById("info-box-advisor").value,
            userId: 0,
            requirement: document.getElementById("requirement").value,
            stage: "Pending",
            courseCode: document.getElementById("courseCode").value,
            courseName: document.getElementById("courseName").value,
            section: document.getElementById("section").value,
            courseTime: document.getElementById("time").value,
            courseUnit: document.getElementById("courseUnit").value,
            teacher: document.getElementById("teacher").value,
            note: document.getElementById("note").value,
            semester: "",
            type: "Request"
        }

        console.log(formData);

        fetch("http://localhost:8080/api/form", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (response.ok) {
                    console.log("Form submitted successfully.");
                } else {
                    throw new Error("Failed to submit form.");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("เกิดข้อผิดพลาดในการส่งคำร้อง กรุณาลองใหม่อีกครั้ง");
            });
        return;
    }
}
/*******************************
        Save Profile Button
 *******************************/
    function SaveProfile() {
        openSaveModal(); // Open the modal when the "ยกเลิก" button is clicked
    }

    function createSaveModal() {
        const modalHtml = `
            <div id="SaveModal" class="modal">
                <div class="modal-content">
                    <h2>บันทึกโปรไฟล์</h2>
                    <p>ท่านต้องการบันทึกข้อมูล ใช่หรือไม่</p>
                    <button class="cancel-btn" onclick="closeSaveModal()">ยกเลิก</button>
                    <button class="confirm-btn" onclick="confirmSave()">บันทึก</button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    function openSaveModal() {
        const modal = document.getElementById("SaveModal");
        if (!modal) {
            createSaveModal(); // Create the modal if it doesn’t exist
        }
        document.getElementById("SaveModal").style.display = "flex";
    }

    function closeSaveModal() {
        const modal = document.getElementById("SaveModal");
        if (modal) {
            modal.style.display = "none";
        }
    }

    function confirmSave() {
        updateProfile()
        const modal = document.getElementById("SaveModal");
        if (modal) {
            modal.style.display = "none";
        }
        console.log("Profile updated...");
    }
