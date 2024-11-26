/*******************************
 * Toggle Password Visibility
 *******************************/
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eye-icon');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text'; // Show the password
        eyeIcon.src = 'img/eye-open-icon.png';
        eyeIcon.alt = 'Hide Password';
    } else {
        passwordInput.type = 'password'; // Hide the password
        eyeIcon.src = 'img/eye-close-icon.png';
        eyeIcon.alt = 'Show Password';
    }
}

/*******************************
 * Mock Data สำหรับการพัฒนา
 *******************************/
const mockStudents = [
    { username: 'student', password: '123456', type: 'student' },
];

const mockProfessors = [
    { username: 'professor', password: '123456', type: 'professor' },
];

/*******************************
 * Submit Login Form
 *******************************/
function submitLogin() {
    const userName = document.getElementById('username')?.value;
    const password = document.getElementById('password')?.value;
    const checkDiv = document.getElementById('check');

    if (!userName || !password) {
        if (checkDiv) checkDiv.innerText = '*กรุณากรอกชื่อผู้ใช้และรหัสผ่าน*';
        return;
    }

    // ตรวจสอบ Mock Data ก่อน
    const validUser = mockStudents.find(user => user.username === userName && user.password === password)
                     || mockProfessors.find(user => user.username === userName && user.password === password);

    if (validUser) {
        console.log('Login Successful with Mock Data:', validUser);
        localStorage.setItem('user', JSON.stringify(validUser)); // บันทึกข้อมูลผู้ใช้ลง LocalStorage
        redirectUser(validUser.type); // เปลี่ยนเส้นทางตามประเภทผู้ใช้
    } else {
        // ถ้าไม่พบข้อมูลใน Mock Data ให้เรียก API
        console.log('Checking API for user authentication...');
        fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Application-Key': 'TU6b385dc1f8327e133ed355505488df04cd80b11ff6273eb291fa94ad1a05c456116ca973efcb839f730143f2cb931d4b'
            },
            body: JSON.stringify({ "UserName": userName, "PassWord": password })
        })
        .then(async response => {
            console.log('Response Status:', response.status);
            const result = await response.json();
            console.log('Response Body:', result);

            if (response.ok) {
                if (result.status) {
                    console.log('Login Successful with API:', result);
                    addToDB(result); // เพิ่มผู้ใช้ในฐานข้อมูล
                } else {
                    if (checkDiv) checkDiv.innerText = 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง!';
                }
            } else {
                if (checkDiv) checkDiv.innerText = result.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์';
            }
        })
        .catch(error => {
            console.error('Error connecting to API:', error);
            if (checkDiv) checkDiv.innerText = 'เกิดข้อผิดพลาดในการเชื่อมต่อกับ API';
        });
    }
}

/*******************************
 * Add User to Database
 *******************************/
function addToDB(user) {
    fetch('http://localhost:8080/api/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log('Existing Users:', data);
        const existingUser = ownedAccount(data, user);
        if (existingUser) {
            console.log('User already exists in DB:', existingUser);
            localStorage.setItem('user', JSON.stringify(existingUser));
            redirectUser(existingUser.type);
        } else {
            console.log('Adding new user to DB...');
            fetch('http://localhost:8080/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: user.email,
                    type: user.type || 'student', // Default to 'student' if type is missing
                    eng_name: user.displayname_en,
                    th_name: user.displayname_th,
                    faculty: user.faculty,
                    department: user.department,
                    birthday: "",
                    year: "",
                    address: "",
                    moo: "",
                    road: "",
                    district: "",
                    province: "",
                    zip_code: "",
                    phone_num: "",
                    advisor: "",
                    user_name: user.username
                }),
            })
            .then(response => response.json())
            .then(newUser => {
                console.log('User added to DB:', newUser);
                localStorage.setItem('user', JSON.stringify(newUser));
                redirectUser(newUser.type);
            });
        }
    })
    .catch(error => console.error('Error fetching or adding user to DB:', error));
}

/*******************************
 * Check for Existing Account
 *******************************/
function ownedAccount(data, user) {
    return data.find(account => account.user_name === user.username) || null;
}

/*******************************
 * Redirect User Based on Role
 *******************************/
function redirectUser(userType) {
    if (userType === 'student') {
        window.location.href = 'main.html'; // ไปที่หน้า Student
    } else if (userType === 'professor') {
        window.location.href = 'professormain.html'; // ไปที่หน้า Professor
    } else {
        console.error('ประเภทผู้ใช้ไม่ถูกต้อง:', userType);
    }
}

/*******************************
 * Session Timeout Handling
 *******************************/
const sessionTimeout = 15 * 60 * 1000; // 15 minutes
let timeoutId;

function resetTimeout() {
    clearTimeout(timeoutId);
    startTimeout();
}

function startTimeout() {
    timeoutId = setTimeout(() => {
        sessionTimeoutLogout();
    }, sessionTimeout);
}

function sessionTimeoutLogout() {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
    console.log('หมดเวลาเซสชัน กำลังออกจากระบบ...');
}

// Reset ตัวจับเวลาเมื่อมี interaction
document.addEventListener("mousemove", resetTimeout);
document.addEventListener("keydown", resetTimeout);
document.addEventListener("click", resetTimeout);
document.addEventListener("scroll", resetTimeout);
startTimeout();

/*******************************
 * On Page Load (Session Check)
 *******************************/
document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const currentPath = window.location.pathname;

    if (!user && !currentPath.includes('login.html')) {
        window.location.href = 'login.html';
    }

    if (user) {
        if (currentPath.includes('student.html') && user.type !== 'student') {
            window.location.href = 'login.html';
        } else if (currentPath.includes('professor.html') && user.type !== 'professor') {
            window.location.href = 'login.html';
        }
    }
});