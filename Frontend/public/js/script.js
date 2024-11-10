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

function submitLogin() {
    const UserName = document.getElementById('username')?.value;
    const PassWord = document.getElementById('password')?.value;
    const checkDiv = document.getElementById('check');

    if (!UserName || !PassWord) {
        if (checkDiv) checkDiv.innerText = '*Please enter both username and password.*';
        return;
    }

    fetch('/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            UserName, 
            PassWord 
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status) {
            const statusDiv = document.getElementById('status');
            const messageDiv = document.getElementById('message');
            
            if (statusDiv) {
                statusDiv.innerText = `Login successful!\nHello and Welcome,\n`;
            }
            if (messageDiv) {
                messageDiv.innerText = 
                    `Username: ${data.username}\n` +
                    `Name: ${data.displayname_en}\n` +
                    `Role: ${data.type}\n` +
                    `Faculty: ${data.faculty}, ${data.department}\n` +
                    `Contact: ${data.email}`;
            }
            
            addToDB(data); 
            window.location.href = 'main.html'; 
        } else {
            if (checkDiv) checkDiv.innerText = 'Incorrect username or password. Please try again!';
        }
    })
    .catch(error => console.error('Error:', error));
}

function addToDB(user) {
    localStorage.setItem('user', JSON.stringify(user)); 
}

function logout() {
    console.log('Logging out...'); // ตรวจสอบว่าฟังก์ชันถูกเรียกใช้
    localStorage.removeItem('user'); // ลบข้อมูลผู้ใช้ (หากมี)
    window.location.href = 'login.html'; // เปลี่ยนเส้นทางไปยังหน้า login
}

// ตรวจสอบการเข้าสู่ระบบเมื่อโหลดหน้า main.html
document.addEventListener('DOMContentLoaded', () => {
    const user = localStorage.getItem('user');
    const currentPath = window.location.pathname; // รับ path ของหน้าปัจจุบัน เช่น "/login.html"

    // ตรวจสอบว่าผู้ใช้เข้าสู่ระบบหรือยัง และตรวจสอบว่าไม่ใช่หน้า login.html
    if (!user && !currentPath.includes('login.html')) {
        // ถ้าไม่มีข้อมูลผู้ใช้ใน localStorage นำผู้ใช้ไปยังหน้า login
        window.location.href = 'login.html';
    }
});

