
let url = `http://localhost:3050/users/user-by-name/`;
export const fetchUserByName = async (userName) => {
    try {
        const response = await fetch(`${url}${userName}`);

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        return data;
        // Handle the user data here
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        // Handle the error here
    }
}
