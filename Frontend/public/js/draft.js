function saveDraft() {
    const uid = document.getElementById('uid')?.value;

    const purpose = document.getElementById('sPurpose')?.value;
    const subjectCode = document.getElementById('sCode')?.value;
    const subjectName = document.getElementById('sName')?.value;
    const section = document.getElementById('sSection')?.value;
    const datetime = document.getElementById('sTime')?.value;
    const credit = document.getElementById('sCredit')?.value;
    const teacher = document.getElementById('sTeacher')?.value;
    const reason = document.getElementById('sReason')?.value;

    fetch('http://localhost:8080/api/form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "id": draftID,
            "user_id": uid,
            "purpose": purpose,
            "stage": "draft",
            "c_code": subjectCode,
            "c_name": subjectName,
            "section": section,
            "time": datetime,
            "c_unit": credit,
            "teacher": teacher,
            "reason": reason,
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to send data');
        }
        return response.json();
    })
    .then(data => {
        draftID = data.id;
    })
    .catch(error => {
        alert('Error:', error);
    });
}

function loadDraft() {
    //โหลดดราฟจากบันทึก
}

let draftID = "";