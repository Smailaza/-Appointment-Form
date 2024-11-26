document.getElementById('appointment-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // جمع بيانات النموذج
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    // التحقق البسيط
    if (!name || !email || !date || !time) {
        alert("Please fill out all fields.");
        return;
    }

    // إرسال البيانات إلى الخادم باستخدام Fetch API
    fetch('http://localhost:3000/book-appointment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            date: date,
            time: time
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Appointment booked successfully!') {
            // إخفاء النموذج وإظهار رسالة التأكيد
            document.getElementById('appointment-form').style.display = 'none';
            document.getElementById('confirmation').classList.remove('hidden');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error booking the appointment.');
    });
});
