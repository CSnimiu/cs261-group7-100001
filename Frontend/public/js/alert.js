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
        avaIcon = `<div class="ava-alert__icon"><h1>Unsaved changes?</h1></div>`;
    } else if (icon === 'confirm') {
        avaIcon = `<div class="ava-alert__icon"><h1>Sending request?</h1></div>`;
    }

    //add HTML structure and content
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

    //adjust alert box
    document.querySelector('.ava-modal > *').style.textAlign = 'center';

    //events: yes
    document.getElementById('yes').addEventListener('click', function () {
        onConfirm();
        modal.remove();
        alert.remove();
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
        text: 'Are you sure to leave this page?<br>Your change will not be saved',
        btnTextL: 'Cancel',
        btnTextR: 'Leave',
    });
}
function send() {
    ava({
        icon: 'confirm',
        text: 'Are you sure you want to submit a request?',
        btnTextL: 'Cancel',
        btnTextR: 'Send',
    });
}

//to-do: alert when save draft and send


