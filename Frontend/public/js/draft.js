const activeForm = JSON.parse(localStorage.getItem('activeform'));
console.log(activeForm);
document.addEventListener('DOMContentLoaded', () => {
    const localuser = JSON.parse(localStorage.getItem('user'));
    fetch(`http://localhost:8080/api/user/${localuser.user_name}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Failed to fetch profile data");
        })
        .then(user => {
            console.log("Fetched profile:", user);
            populateDraft(user);
        })
        .catch(error => {
            console.error("Error fetching profile:", error);
        });
})

function populateDraft(user) {
    if(activeForm.stage === "Draft"){form = activeForm;} else {form = user;}
    document.getElementById("info-box-thname").value = form.th_name.split(" ")[0] || "";
    document.getElementById("info-box-thlname").value = form.th_name.split(" ")[1] || "";
    document.getElementById("info-box-enname").value = form.eng_name.split(" ")[0] || "";
    document.getElementById("info-box-enlname").value = form.eng_name.split(" ")[1] || "";
    document.getElementById("info-box-faculty").value = form.faculty || "";
    document.getElementById("info-box-major").value = form.department || "";
    document.getElementById("info-box-id").value = form.user_name || "";
    document.getElementById("info-box-year").value = form.year || "";
    document.getElementById("info-box-address").value = form.address || "";
    document.getElementById("info-box-moo").value = form.moo || "";
    document.getElementById("info-box-subdistrict").value = form.road || "";
    document.getElementById("info-box-district").value = form.district || "";
    document.getElementById("info-box-state").value = form.province || "";
    document.getElementById("info-box-postcode").value = form.zip_code || "";
    document.getElementById("info-box-email").value = form.email || "";
    document.getElementById("info-box-phone").value = form.phone_num || "";
    document.getElementById("info-box-advisor").value = form.advisor || "";
    if(activeForm.stage === "Draft"){
        document.getElementById("requirement").value = form.requirement || "";
        document.getElementById("courseCode").value = form.courseCode || "";
        document.getElementById("courseName").value = form.courseName || "";
        document.getElementById("section").value = form.section || "";
        document.getElementById("time").value = form.courseTime || "";
        document.getElementById("courseUnit").value = form.courseUnit || "";
        document.getElementById("teacher").value = form.teacher || "";
        document.getElementById("note").value = form.note || "";
    }
}