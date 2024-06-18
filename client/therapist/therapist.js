import { getTherapist } from "../api/therapist/get_alltherapist.js";

const userName = localStorage.getItem("userName");
const select = document.getElementById("select");
let data = "";

const filterTherapistsByName = (therapists, searchTerm) => {
    return therapists.filter(therapist => {
        const fullName = `${therapist.firstName} ${therapist.lastName}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
    });
};

const filterTherapistsBySpecialization = (therapists, specialization) => {
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

        if (specialization !== 'all') {
            filteredData = filterTherapistsBySpecialization(filteredData, specialization);
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
        console.log("Therapist ID:", therapist.therapistId);
        console.log("First Name:", therapist.firstName);
        console.log("Last Name:", therapist.lastName);
        console.log("Address:", therapist.address);
        console.log("Phone Number:", therapist.phoneNumber);
        console.log("Email:", therapist.email);
        console.log("License and Certifications:", therapist.licenseAndCertifications.join(', '));
        console.log("Start Date:", new Date(therapist.startDate).toLocaleDateString());
        console.log("End Date:", therapist.endDate ? new Date(therapist.endDate).toLocaleDateString() : '');
        console.log("Hourly Rate:", therapist.hourlyRate ? therapist.hourlyRate : '');
        console.log("Notes:", therapist.notes ? therapist.notes : '');
        console.log("Days Available:", Object.keys(therapist.daysAvailable).filter(day => therapist.daysAvailable[day]).join(', '));
        console.log("Availability Hours:", therapist.availabilityHours.join(', '));
        console.log("Specializations:", therapist.specializations.join(', '));
    } else {
        console.log("Therapist not found");
    }
}
