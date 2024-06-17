let url = "http://localhost:3050/therapist/";

export const getTherapist = async () => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json(); // Assuming the response is JSON
        console.log("data api", data);
        return data; // Ensure the data is returned
    } catch (err) {
        console.error('There was a problem with the fetch operation:', err);
    }
}
