
document.addEventListener("DOMContentLoaded", () => {
    const days = ["ראשון", "שני", "שלישי", "רביעי", "חמישי"];
    const dateIds = ["day1", "day2", "day3", "day4", "day5"];
    let currentDate = new Date();

    // פונקציה שמחזירה את התאריך הבא שהוא יום עסקים
    function getNextBusinessDay(date) {
        const day = date.getDay();
        if (day === 5) {
            // אם זה שישי, מוסיפים יומיים
            date.setDate(date.getDate() + 2);
        } else if (day === 6) {
            // אם זה שבת, מוסיפים יום אחד
            date.setDate(date.getDate() + 1);
        } else {
            date.setDate(date.getDate() + 1);
        }
        return date;
    }

    // לולאה שמציבה את התאריכים בעמודה הנכונה בטבלה
    dateIds.forEach((id, index) => {
        // מקבלים את התאריך הבא שהוא יום עסקים
        currentDate = getNextBusinessDay(currentDate);
        // מציבים את התאריך בתא המתאים
        document.getElementById(id).textContent = `${days[index]} ${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    });
});
