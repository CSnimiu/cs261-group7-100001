let req_id;
const activeForm = JSON.parse(localStorage.getItem('activeform'));
document.addEventListener('DOMContentLoaded', () => {
    if(!activeForm) window.location.href = "../professormain.html";
    else {
        if(activeForm.stage != "Pending") {
            alert("คำร้องนี้ได้รับการพิจราณาแล้ว");
            window.location.href = "../professormain.html";
        }
        req_id = activeForm.id;
        populateForm(activeForm);
    }
})

function populateForm(data) {
    console.log(data);
    document.getElementById("info-box-thname").value = data.th_name.split(" ")[0] || "";
    document.getElementById("info-box-thlname").value = data.th_name.split(" ")[1] || "";
    document.getElementById("info-box-enname").value = data.eng_name.split(" ")[0] || "";
    document.getElementById("info-box-enlname").value = data.eng_name.split(" ")[1] || "";
    document.getElementById("info-box-faculty").value = data.faculty || "";
    document.getElementById("info-box-major").value = data.department || "";
    document.getElementById("info-box-id").value = data.user_name || "";
    document.getElementById("info-box-year").value = data.year || "";
    document.getElementById("info-box-address").value = data.address || "";
    document.getElementById("info-box-moo").value = data.moo || "";
    document.getElementById("info-box-subdistrict").value = data.road || "";
    document.getElementById("info-box-district").value = data.district || "";
    document.getElementById("info-box-state").value = data.province || "";
    document.getElementById("info-box-postcode").value = data.zip_code || "";
    document.getElementById("info-box-email").value = data.email || "";
    document.getElementById("info-box-phone").value = data.phone_num || "";
    document.getElementById("info-box-advisor").value = data.advisor || "";
    document.getElementById("info-box-requirement").value = data.requirement || "";
    document.getElementById("info-box-subjectcode").value = data.courseCode || "";
    document.getElementById("info-box-subjectname").value = data.courseName || "";
    document.getElementById("info-box-section").value = data.section || "";
    document.getElementById("info-box-time").value = data.courseTime || "";
    document.getElementById("info-box-credit").value = data.courseUnit || "";
    document.getElementById("info-box-instructor").value = data.teacher || "";
    document.getElementById("info-box-reason").value = data.note || "";
}

//////////////////////////////////////
////////////     Modal    ////////////
//////////////////////////////////////

function ApproveRequest() {
    openApproveModal();
}

function DenyRequest() {
    openDenyModal();
}

function LeaveRequest() {
    openLeaveModal();
}

function createApproveModal() {
    const modalHtml = `
        <div id="ApproveModal" class="modal">
            <div class="modal-content">
                <h2>อนุมัติคำร้อง</h2>
                <p>ท่านต้องการอนุมัติคำร้อง ใช่หรือไม่</p>
                <button class="abort-btn" onclick="closeApproveModal()">ยกเลิก</button>
                <button class="confirm-btn" onclick="confirmApprove()">อนุมัติคำร้อง</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function createDenyModal() {
    const modalHtml = `
        <div id="DenyModal" class="modal">
            <div class="modal-content">
                <h2>ปฎิเสธคำร้อง</h2>
                <p>ท่านต้องการปฎิเสธคำร้อง ใช่หรือไม่</p>
                <button class="abort-btn" onclick="closeDenyModal()">ยกเลิก</button>
                <button class="cancel-btn" onclick="confirmDeny()">ปฎิเสธคำร้อง</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function createLeaveModal() {
    const modalHtml = `
        <div id="LeaveModal" class="modal">
            <div class="modal-content">
                <h2>ออกจากหน้าคำร้อง</h2>
                <p>ท่านต้องการย้อนกลับไปหน้าหลัก ใช่หรือไม่</p>
                <button class="cancel-btn" onclick="closeLeaveModal()">คงอยู่หน้านี้</button>
                <button class="confirm-btn" onclick="confirmLeave()">กลับหน้าหลัก</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function openApproveModal() {
    const modal = document.getElementById("ApproveModal");
    if (!modal) {
        createApproveModal();
    }
    document.getElementById("ApproveModal").style.display = "flex";
}

function closeApproveModal() {
    const modal = document.getElementById("ApproveModal");
    if (modal) {
        modal.style.display = "none";
    }
}

function openDenyModal() {
    const modal = document.getElementById("DenyModal");
    if (!modal) {
        createDenyModal();
    }
    document.getElementById("DenyModal").style.display = "flex";
}

function closeDenyModal() {
    const modal = document.getElementById("DenyModal");
    if (modal) {
        modal.style.display = "none";
    }
}

function openLeaveModal() {
    const modal = document.getElementById("LeaveModal");
    if (!modal) {
        createLeaveModal();
    }
    document.getElementById("LeaveModal").style.display = "flex";
}

function closeLeaveModal() {
    const modal = document.getElementById("LeaveModal");
    if (modal) {
        modal.style.display = "none";
    }
}

/////////////////////////////////////
//////////    functions    //////////
/////////////////////////////////////

function confirmApprove() {
    closeApproveModal();
    updateStage('Accept');
    flush();
}

function confirmDeny() {
    closeDenyModal();
    updateStage('Deny');
    flush();
}

function confirmLeave() {
    flush();
}

function updateStage(stage) {
    fetch(`http://localhost:8080/api/form/${req_id}?stage=${stage}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Failed to update profile");
        })
        .catch(error => {
            console.error("Error processing form:", error);
            alert("เกิดข้อผิดพลาดในการตรวจสอบคำร้อง");
        });
}

function flush() {
    localStorage.removeItem('activeform');
    window.location.href = "../professormain.html";
}