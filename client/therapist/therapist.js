import { getTherapist } from "../api/therapist/get_alltherapist.js";
const userName = localStorage.getItem("userName");

const filterTherapistsByName = (therapists, searchTerm) => {
    return therapists.filter(therapist => {
        const fullName = `${therapist.firstName} ${therapist.lastName}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
    });
};

export const generateTherapistHTML = async (searchTerm = '') => {
    try {
        const data = await getTherapist();

        if (!Array.isArray(data) || data.length === 0) {
            throw new Error("No therapist data available");
        }

        // פילטור נתונים לפי שם פרטי ושם משפחה
        const filteredData = filterTherapistsByName(data, searchTerm);

        const therapistContainer = document.createElement('div');
        therapistContainer.classList.add('therapist-container');

        filteredData.forEach(therapist => {
            const therapistItem = document.createElement('div');
            therapistItem.classList.add('therapist-item');

            therapistItem.innerHTML = `
                <div class="therapist-card">
                    <h3>${therapist.firstName} ${therapist.lastName}</h3>
                    <p><strong>Therapist ID:</strong> ${therapist.therapistId}</p>
                    <p><strong>Therapist Name:</strong> ${therapist.therapistName}</p>
                    <p><strong>Address:</strong> ${therapist.address}</p>
                    <p><strong>Phone:</strong> ${therapist.phoneNumber}</p>
                    <p><strong>Email:</strong> ${therapist.email}</p>
                    <p><strong>License and Certifications:</strong> ${therapist.licenseAndCertifications.join(', ')}</p>
                    <p><strong>Start Date:</strong> ${therapist.startDate}</p>
                    ${therapist.endDate ? `<p><strong>End Date:</strong> ${therapist.endDate}</p>` : ''}
                    ${therapist.hourlyRate ? `<p><strong>Hourly Rate:</strong> ${therapist.hourlyRate}</p>` : ''}
                    ${therapist.notes ? `<p><strong>Notes:</strong> ${therapist.notes}</p>` : ''}
                </div>
            `;

            therapistContainer.appendChild(therapistItem);
        });

        return therapistContainer;
    } catch (error) {
        console.error("Error fetching therapist data:", error);
        return null;
    }
};

document.addEventListener("DOMContentLoaded", async function() {
    try {
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
    therapistContainer.innerHTML = ''; // ניקוי התוכן הקיים

    const filteredTherapistContainerHTML = await generateTherapistHTML(searchTerm);
    if (filteredTherapistContainerHTML) {
        therapistContainer.appendChild(filteredTherapistContainerHTML);
    } else {
        console.error("Failed to generate filtered therapist HTML");
    }
});

