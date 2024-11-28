const ava = ({ icon = 'logout', text = null, btnTextL = 'Cancel', btnTextR = 'Confirm', onConfirm = () => {}, onCancel = () => {} }) => {
    const modal = document.createElement('section');
    modal.setAttribute('class', 'ava-modal');
    document.body.appendChild(modal);

    const alert = document.createElement('div');
    alert.setAttribute('class', 'ava-alert');
    modal.appendChild(alert);

    //set alert icon and text based on the icon type
    let avaIcon;
    if (icon === 'logout') {
        avaIcon = `<div class="ava-alert__icon"><h1>ออกจากระบบ</h1></div>`;
    } else if (icon === 'leave') {
        avaIcon = `<div class="ava-alert__icon"><h1>คำร้องยังไม่ได้บันทึก</h1></div>`;
    } else if (icon === 'confirm') {
        avaIcon = `<div class="ava-alert__icon"><h1>ยื่นคำร้อง</h1></div>`;
    } else if (icon === 'save') {
        avaIcon = `<div class="ava-alert__icon"><h1>บันทึกแบบร่าง</h1></div>`;
    }

    //add HTML structure and content
    /*
    alert.innerHTML = `
        ${avaIcon}
        <div class='ava-text-con'>
            <p class="ava-alert__text">${text}</p>
            <div class="ava-alert__btn">
                <button id="no">${btnTextL}</button>
                <button id="yes">${btnTextR}</button>
            </div>
        </div>
    `;
    */
    let confirmButtonID = (icon === 'confirm' || icon === 'save') ? 'yes_g' : 'yes';
    alert.innerHTML = `
        ${avaIcon}
        <div class='ava-text-con'>
            <p class="ava-alert__text">${text}</p>
            <div class="ava-alert__btn">
                <button id="no">${btnTextL}</button>
                <button id="${confirmButtonID}">${btnTextR}</button>
            </div>
        </div>
    `;

    //adjust alert box
    document.querySelector('.ava-modal > *').style.textAlign = 'center';

    //events: yes
    /*
    document.getElementById('yes').addEventListener('click', function () {
        onConfirm();
        modal.remove();
        alert.remove();
    });
    */
    document.querySelectorAll('#yes, #yes_g').forEach(button => {
        button.addEventListener('click', function () {
            onConfirm();
            modal.remove();
            alert.remove();
        });
    });

    //events: cancel
    document.getElementById('no').addEventListener('click', function () {
        onCancel();
        modal.remove();
        alert.remove();
    });

    //events: close alert
    window.addEventListener('click', function (e) {
        if (e.target === modal) {
            e.stopPropagation();
            modal.remove();
            alert.remove();
        }
    });
};

function logout() {
    ava({
        icon: 'logout',
        text: 'คุณต้องการออกจากระบบใช่หรือไม่?',
        btnTextL: 'ยกเลิก',
        btnTextR: 'ยืนยัน',
        onConfirm: () => {
            localStorage.removeItem('user');            //clear user data
            window.location.href = 'login.html';        //redirect to login page
            console.log('Logging out...');              //check if function working
        },
        onCancel: () => {
            console.log('Logout cancelled');            //check if function working
        }
    });
}

//for other user's confirmations (unfinished)
function leave() {
    ava({
        icon: 'leave',
        text: 'ท่านต้องการออกจากหน้าแบบฟอร์มใช่หรือไม่?',
        btnTextL: 'แก้ไขต่อ',
        btnTextR: 'ทิ้งแบบร่าง',
        onConfirm: () => {
            window.location.href = "../main.html"; // Redirect to the main page
            console.log("Form submission canceled...");
        },
        onCancel: () => {
            console.log('Discard cancelled');            //check if function working
        }
    });
}
function send() {
    ava({
        icon: 'confirm',
        text: 'ท่านต้องการยื่นคำร้องใช่หรือไม่?',
        btnTextL: 'ยกเลิก',
        btnTextR: 'ยืนยัน',
        onConfirm: () => {
            sendFormData();  // Call sendFormData() only when the user confirms
            alert("Form submitted successfully!");
            console.log("Form submission confirmed");
        },
        onCancel: () => {
            console.log('Submission cancelled'); // Log if the user cancels
        }
    });
}
function save() {
    ava({
        icon: 'save',
        text: 'ท่านต้องการบันทึกแบบร่างคำร้องใช่หรือไม่?',
        btnTextL: 'ยกเลิก',
        btnTextR: 'ยืนยัน',
        onConfirm: () => {
            sendFormDraftData(); // Call sendFormDraftData() only when the user confirms
            alert("Draft saved successfully!");
            console.log("Draft save confirmed");
        },
        onCancel: () => {
            console.log('Draft save cancelled'); // Log if the user cancels
        }
    });
}

function confirmSaveProfile() {
    ava({
        icon: 'save', // Use the appropriate icon based on your ava logic
        text: 'ท่านต้องการบันทึกข้อมูลโปรไฟล์ใช่หรือไม่?',
        btnTextL: 'ยกเลิก',  // Cancel button text
        btnTextR: 'ยืนยัน',  // Confirm button text
        onConfirm: () => {
            alert("ข้อมูลได้รับการบันทึกสำเร็จ!");
            saveProfile();  // Call the original saveProfile function after confirmation
        },
        onCancel: () => {
            console.log('Profile save canceled'); // Optional: log or handle cancellation
        }
    });
}

//to-do: alert when save draft and send


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
            saveDraft();
            alert("Form submitted successfully!");
            closeSubmitModal(); // Close the modal after confirming
            console.log("Form submission confirmed...");
        }


