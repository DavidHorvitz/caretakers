document.addEventListener('DOMContentLoaded', function () {
    const calendarBody = document.getElementById('calendarBody');
    const appointmentsContainer = document.getElementById('appointmentsContainer');
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    const userId = localStorage.getItem("user")
    const nextMonth = document.getElementById("NextMonth");
    const previousMonth = document.getElementById("logOut");
    previousMonth.addEventListener("click", () => changeMonth(-1))
    nextMonth.addEventListener("click", () => changeMonth(1))





    //console.log(userId);
    console.log(userId)


    updateCalendar(currentMonth, currentYear);

    function setMiting(day, month, year, time) {
        pass
    }

    // פונקציה לעדכון הלוח שנה
    function updateCalendar(month, year) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const monthName = new Date(year, month).toLocaleString('default', { month: 'long' });
        document.getElementById('monthYear').textContent = `${monthName} ${year}`;

        // ניקוי תוכן הלוח הקיים
        calendarBody.innerHTML = '';

        // יצירת לוח שנה
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('button');
            dayElement.classList.add('day');
            dayElement.textContent = day;
            /*if (אם התאריך עדיין לא עבר && והיום זה יום עבודה){}*/
            dayElement.addEventListener('click', () => showAppointments(day, month, year));
            calendarBody.appendChild(dayElement);
        }

        // פונקציה לשינוי חודש
        function changeMonth(delta) {
            console.log(currentMonth);
            currentMonth += delta;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            } else if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            updateCalendar(currentMonth, currentYear);
        }

        // פונקציה להצגת או הסתרת תפריט ה-dropdown
        function toggleDropdown() {
            document.getElementById("monthDropdown").classList.toggle("show");
        }

        // סגירת ה-dropdown כאשר המשתמש לוחץ מחוץ לתפריט
        window.onclick = function (event) {
            if (!event.target.matches('.dropbtn')) {
                var dropdowns = document.getElementsByClassName("dropdown-content");
                for (var i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }
            }
        }
    };
    // פונקציה להצגת פגישות ליום מסוים
    function showAppointments(day, month, year) {
        // ניקוי התוכן הקיים ב-container הפגישות
        appointmentsContainer.innerHTML = '';

        const appointments = localStorage.getItem("queueEveryHalfHour")
        // for (let shift = 0; shifts <= numShifts; shift++) {
        //     for (let start =
        //         { time: '10:00', title: 'Meeting with client' },
        //         { time: '12:00', title: 'Lunch break' },
        //         { time: '15:00', title: 'Project review' }
        //       };

        // יצירת אלמנטים להצגת הפגישות
        appointments.forEach(appointment => {
            const appointmentElement = document.createElement('div');
            appointmentElement.classList.add('appointment');
            appointmentElement.textContent = `${appointment.time} - ${appointment.title}`;
            /* כפתור קביעת פגישה*/
            appointmentElement.addEventListener('click', setMiting(day, month, year, appointment.time));
            appointmentsContainer.appendChild(appointmentElement);
        });
    }
})
document.addEventListener("DOMContentLoaded", function () {
    const therapistJSON = localStorage.getItem("therapist");
    console.log("Therapist JSON from localStorage:", therapistJSON);

    if (!therapistJSON) {
        console.error("No therapist found in localStorage");
        return;
    }

    try {
        const therapist = JSON.parse(therapistJSON);
        console.log("Parsed therapist object:", therapist);

        const {
            firstName,
            lastName,
            therapistId: id,
            address,
            phoneNumber,
            email,
            licenseAndCertifications,
            startDate,
            endDate,
            hourlyRate,
            notes,
            daysAvailable,
            availabilityHours,
            queueEveryHalfHour,
            specializations,
        } = therapist;

        document.getElementById("therapist-name").innerText = `${firstName} ${lastName}`;
        document.getElementById("therapist-id").innerText = id;
        document.getElementById("therapist-address").innerText = address;
        document.getElementById("therapist-phone").innerText = phoneNumber;
        document.getElementById("therapist-email").innerText = email;
        document.getElementById("therapist-license").innerText = licenseAndCertifications.join(', ');
        document.getElementById("therapist-start-date").innerText = new Date(startDate).toLocaleDateString();
        document.getElementById("therapist-end-date").innerText = endDate ? new Date(endDate).toLocaleDateString() : 'N/A';
        document.getElementById("therapist-hourly-rate").innerText = hourlyRate ? `$${hourlyRate}` : 'N/A';
        document.getElementById("therapist-notes").innerText = notes || 'N/A';
        document.getElementById("therapist-days-available").innerText = Object.keys(daysAvailable).filter(day => daysAvailable[day]).join(', ');
        document.getElementById("therapist-availability-hours").innerText = availabilityHours.join(', ');
        document.getElementById("therapist-specializations").innerText = specializations.join(', ');
        document.getElementById("queueEveryHalfHour").innerText = queueEveryHalfHour.join(', ');

    } catch (error) {
        console.error("Error parsing therapist data from localStorage:", error);
    }
});

const logOut = document.getElementById("logOut");

function userLogOut() {
    // Add an event listener for beforeunload event
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Set a timeout for the redirect and other logout actions
    setTimeout(() => {
        // Remove the beforeunload event listener once the timeout is complete
        window.removeEventListener("beforeunload", handleBeforeUnload);

        // Redirect to the login page
        window.location.href = "../login/login.html";

        // Clear user information
        localStorage.setItem("user", "");
    }, 5000);
}

function handleBeforeUnload(event) {
    // Set the message for the beforeunload event
    const message = "Are you sure you want to leave? Your session will be terminated.";

    // Set the returnValue property of the event to display the message
    event.returnValue = message;
    return message;
}