const userNameInput = document.getElementById("user");
const passwordInput = document.getElementById("password");
const submitButton = document.getElementById("submit");
const result = document.getElementById('result');
const resetButton = document.getElementById("reset");
const testButton = document.getElementById("test");

submitButton.addEventListener("click", () => getUser(`userName=${userNameInput.value}&password=${passwordInput.value}`));
resetButton.addEventListener("click", deleteData);
testButton.addEventListener("click", fanTest);

function fanTest() {
    localStorage.setItem("userName", userNameInput.value);
    const jj = localStorage.getItem("userName");
    console.log(jj);
}

let url = "http://localhost:3050/users/login";

function deleteData() {
    userNameInput.value = "";
    passwordInput.value = "";
}

async function getUser(params) {
    try {
        localStorage.setItem("userName", userNameInput.value);
        console.log(`${url}?${params}`);
        const response = await fetch(`${url}?${params}`);
        const userData = await response.json();
        localStorage.setItem("user", userData.user)     
        
        console.log(response.ok);
        if (response.ok) {
            setTimeout(() => { window.location.href = "../therapist/therapist.html"; }, 5000);
            result.textContent = `Welcome ${localStorage.getItem("userName")} dear patient, you are transferred to the site`;
        } else {
            result.textContent = "The username or password is incorrect, please try again";
        }
    } catch (error) {
        // Handle any errors that occur
        console.error('There was a problem with the fetch operation:', error);
        result.textContent = 'Error: ' + error.message;
    }
}
