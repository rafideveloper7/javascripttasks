let is24Hour = false;

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let day = now.getDate();
    let month = now.getMonth() + 1; // Months are zero-based
    let year = now.getFullYear();
    let ampm = '';

    if (!is24Hour) {
        ampm = hours >= 12 ? ' PM' : ' AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // 0 becomes 12
    }

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    document.getElementById('clock').innerText = `${hours}:${minutes}:${seconds}${!is24Hour ? ampm : ''} `;

    document.getElementById('date').innerText = `${day}/${month}/${year}`;
}

// Call every second
setInterval(updateClock, 1000);
updateClock(); // Initial call

function toggleFormat() {
    is24Hour = !is24Hour;
    const btn = document.querySelector('button');
    btn.innerText = is24Hour ? "Switch to AM/PM" : "Switch to 24 Hour";
    updateClock();
}
