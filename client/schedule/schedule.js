import { fetchUserByName } from "../api/users/get_user_by_name.js";
import { addMeeting } from "../api/meeting/add_meeting.js";
import { getMeetings } from "../api/meeting/get_meetings.js";

document.addEventListener('DOMContentLoaded', async function () {
    const calendarBody = document.getElementById('calendarBody');
    const appointmentsContainer = document.getElementById('appointmentsContainer');
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    const userName = localStorage.getItem("userName");
    const logOut = document.getElementById("logOut");
    const nextMonth = document.getElementById("NextMonth");
    const previousMonth = document.getElementById("PreviousMonth");
    previousMonth.addEventListener("click", () => changeMonth(-1));
    nextMonth.addEventListener("click", () => changeMonth(1));
    console.log(new Date().getDate());
    console.log(userName);

    const userData = await fetchUserByName(userName);
    

    updateCalendar(currentMonth, currentYear);

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
    }

    // פונקציה להצגת פגישות ליום מסוים
    function showAppointments(day, month, year) {
        // ניקוי התוכן הקיים ב-container הפגישות
        appointmentsContainer.innerHTML = '';
        let queueEveryHalfHour = JSON.parse(localStorage.getItem("therapist")).queueEveryHalfHour;
        let therapist = JSON.parse(localStorage.getItem("therapist"));
        const therapistId = therapist._id;

        // יצירת אלמנטים להצגת הפגישות
        queueEveryHalfHour.forEach(queueTime => {
            const appointmentElement = document.createElement('div');
            appointmentElement.classList.add('appointment');
            appointmentElement.textContent = `${queueTime}`;

            // יצירת כפתור לקביעת תור
            const appointmentButton = document.createElement('button');
            appointmentButton.textContent = 'קביעת תור';
            appointmentButton.addEventListener('click', function() {
                const time = new Date(year, month, day);
                const hour = queueTime;
                const userId = userData._id;
                setMeeting(therapistId, userId, time, hour);
            });

            appointmentElement.appendChild(appointmentButton);
            appointmentsContainer.appendChild(appointmentElement);
        });
    }

    // פונקציה לקביעת תור
    async function setMeeting(therapistId, userId, time, hour) {
        try {
            const response = await addMeeting(therapistId, userId, time, hour);
            if (response) {
                console.log('Meeting successfully scheduled:', response);
            } else {
                console.error('Failed to schedule meeting.');
            }
        } catch (error) {
            console.error('Error scheduling meeting:', error);
        }
    }
});

logOut.addEventListener("click", () => userLogOut());

function userLogOut() {
    // Add an event listener for beforeunload event
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Set a timeout for the redirect and other logout actions
    setTimeout(() => {
        // Remove the beforeunload event listener once the timeout is complete
        window.removeEventListener("beforeunload", handleBeforeUnload);

        // Redirect to the login page
        window.location.replace("../login/login.html");

        // Clear user information
        localStorage.setItem("userName", "");
        userName = "";
    }, 5000);
}

function handleBeforeUnload(event) {
    // Set the message for the beforeunload event
    const message = "Are you sure you want to leave? Your session will be terminated.";

    // Set the returnValue property of the event to display the message
    event.returnValue = message;
    return message;
}
