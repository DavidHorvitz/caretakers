const userName = document.getElementById("user");
const password = document.getElementById("password");
const button = document.getElementById("button");
const result = document.getElementById('result')
button.addEventListener("click", ()=>getUser(`userName=${userName.value}&password=${password.value}`));
let url = "http://localhost:3050/users/login";
async function getUser(params){
    try{    
        console.log(`${url}?${params}`);
        const response = await fetch(`${url}?${params}`); 
        console.log(response); 
        console.log(response.ok); 
        if (response.ok) {
            setTimeout(()=>{window.location.href = "../therapist/therapist.html";},5000)
            result.textContent = "Welcome dear patient, you are transferred to the site";
        }
        else if(!response){
            result.textContent = "The username or password is incorrect, please try again";
        }
    }
    catch(error) {
            // Handle any errors that occur
            console.error('There was a problem with the fetch operation:', error);
            result.textContent = 'Error: ' + error.message;
    }

}



