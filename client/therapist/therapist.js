import { getTherapist } from "../api/therapist/get_alltherapist.js";

let userName = localStorage.getItem("userName");
let userId = localStorage.getItem("user");
const select = document.getElementById("select");
const logOut = document.getElementById("logOut");
let data = "";

const filterTherapistsByName = (therapists, searchTerm) => {
    if (!searchTerm) return therapists;
    return therapists.filter(therapist => {
        const fullName = `${therapist.firstName} ${therapist.lastName}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
    });
};

const filterTherapistsBySpecialization = (therapists, specialization) => {
    if (specialization === 'all') return therapists;
    return therapists.filter(therapist => {
        return therapist.specializations.includes(specialization);
    });
};

export const generateTherapistHTML = async (searchTerm = '', specialization = 'all') => {
    try {
        if (!Array.isArray(data) || data.length === 0) {
            throw new Error("No therapist data available");
        }

        let filteredData = filterTherapistsByName(data, searchTerm);

        // Check if there are no results and alert the user
        if (filteredData.length === 0) {
            alert('No therapists were found with the requested specialization.');        }

        if (specialization !== 'all') {
            filteredData = filterTherapistsBySpecialization(filteredData, specialization);

            // Check if there are no results and alert the user
            if (filteredData.length === 0) {
                alert('No specialization were found with the requested specialization.');
            }
        }

        const therapistContainer = document.createElement('div');
        therapistContainer.classList.add('therapist-container');

        filteredData.forEach(therapist => {
            const therapistItem = document.createElement('div');
            therapistItem.classList.add('therapist-item');

            const daysAvailable = Object.entries(therapist.daysAvailable)
                .filter(([day, available]) => available)
                .map(([day]) => day)
                .join(', ');

            therapistItem.innerHTML = `
               <div class="therapist-card">
                    <h3>${therapist.firstName} ${therapist.lastName}</h3>
                    <p><strong>Therapist ID:</strong> ${therapist.therapistId}</p>
                    <p><strong>Therapist Name:</strong> ${therapist.therapistName}</p>
                    <p><strong>Address:</strong> ${therapist.address}</p>
                    <p><strong>Phone:</strong> ${therapist.phoneNumber}</p>
                    <p><strong>Email:</strong> ${therapist.email}</p>
                    <p><strong>License and Certifications:</strong> ${therapist.licenseAndCertifications.join(', ')}</p>
                    <p><strong>Start Date:</strong> ${new Date(therapist.startDate).toLocaleDateString()}</p>
                    ${therapist.endDate ? `<p><strong>End Date:</strong> ${new Date(therapist.endDate).toLocaleDateString()}</p>` : ''}
                    ${therapist.hourlyRate ? `<p><strong>Hourly Rate:</strong> $${therapist.hourlyRate}</p>` : ''}
                    ${therapist.notes ? `<p><strong>Notes:</strong> ${therapist.notes}</p>` : ''}
                    <p><strong>Days Available:</strong> ${daysAvailable}</p>
                    <p><strong>Availability Hours:</strong> ${therapist.availabilityHours.join(', ')}</p>
                    <p><strong>queue Every Half Hour:</strong> ${therapist.queueEveryHalfHour.join(', ')}</p>
                    <p><strong>Specializations:</strong> ${therapist.specializations.join(', ')}</p>
                </div>
            `;

            therapistItem.addEventListener('click', () => handleTherapistClick(therapist.therapistId));
            therapistContainer.appendChild(therapistItem);
        });

        return therapistContainer;
    } catch (error) {
        console.error("Error fetching therapist data:", error);
        return null;
    }
};

document.addEventListener("DOMContentLoaded", async function () {
    try {
        data = await getTherapist();
        const therapistContainerHTML = await generateTherapistHTML();
        if (therapistContainerHTML) {
            const therapistContainer = document.getElementById("therapist-item");
            therapistContainer.appendChild(therapistContainerHTML);
        } else {
            console.error("Failed to generate therapist HTML");
        }
    } catch (error) {
        console.error("Error generating therapist HTML:", error);
    }
});

document.getElementById("search-btn").addEventListener("click", async () => {
    const searchTerm = document.getElementById("search-input").value;

    const therapistContainer = document.getElementById("therapist-item");
    therapistContainer.innerHTML = '';

    const filteredTherapistContainerHTML = await generateTherapistHTML(searchTerm, select.value);
    if (filteredTherapistContainerHTML) {
        therapistContainer.appendChild(filteredTherapistContainerHTML);
    } else {
        console.error("Failed to generate filtered therapist HTML");
    }
});

select.addEventListener("change", async (event) => {
    const specialization = event.target.value;

    const searchTerm = document.getElementById("search-input").value;

    const therapistContainer = document.getElementById("therapist-item");
    therapistContainer.innerHTML = '';

    const filteredTherapistContainerHTML = await generateTherapistHTML(searchTerm, specialization);
    if (filteredTherapistContainerHTML) {
        therapistContainer.appendChild(filteredTherapistContainerHTML);
    } else {
        console.error("Failed to generate filtered therapist HTML");
    }
});

const handleTherapistClick = (therapistId) => {
    const therapist = data.find(therapist => therapist.therapistId === therapistId);
    if (therapist) {
        localStorage.setItem("therapist", JSON.stringify(therapist));
        console.log("Therapist saved to localStorage:", therapist);
        window.location.href = '../schedule/schedule.html';
    } else {
        console.log("Therapist not found");
    }
};


logOut.addEventListener("click", () => userLogOut());

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

