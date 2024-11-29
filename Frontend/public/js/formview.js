let req_id;
const activeForm = JSON.parse(localStorage.getItem('activeform'));
document.addEventListener('DOMContentLoaded', () => {
    if(!activeForm) window.location.href = "../main.html";
    else {
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