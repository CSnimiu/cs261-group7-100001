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
    document.getElementById("info-box-thname").value = user.th_name.split(" ")[0] || "";
    document.getElementById("info-box-thlname").value = user.th_name.split(" ")[1] || "";
    document.getElementById("info-box-enname").value = user.eng_name.split(" ")[0] || "";
    document.getElementById("info-box-enlname").value = user.eng_name.split(" ")[1] || "";
    document.getElementById("info-box-faculty").value = user.faculty || "";
    document.getElementById("info-box-major").value = user.department || "";
    document.getElementById("info-box-id").value = user.user_name || "";
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