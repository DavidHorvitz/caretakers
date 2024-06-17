const userName = document.getElementById("user");
const password = document.getElementById("password");
const submit = document.getElementById("submit");
const result = document.getElementById('result')
const reset = document.getElementById("reset")
const test = document.getElementById("test")


localStorage.setItem(userName, userName.value);


submit.addEventListener("click", ()=>getUser(`userName=${userName.value}&password=${password.value}`));
reset.addEventListener("click", ()=>deleteData());
test.addEventListener("click", ()=>fanTest());


function fanTest(){
    localStorage.setItem("userName", userName.value);
    const jj = localStorage.getItem("userName")
    console.log(jj); 
}

let url = "http://localhost:3050/users/login";
function deleteData(){
    userName.value = "";
    password.value= "";


}
async function getUser(params){
    try{
        localStorage.setItem("userName", userName.value);  
        console.log(`${url}?${params}`);
        const response = await fetch(`${url}?${params}`); 
        console.log(response); 
        console.log(response.ok); 
        if (response.ok) {
            setTimeout(()=>{window.location.href = "../therapist/therapist.html";},5000)
            result.textContent = `Welcome ${localStorage.getItem("userName")} dear patient, you are transferred to the site`;
        }
        else {
            result.textContent = "The username or password is incorrect, please try again";
        }
    }
    catch(error) {
            // Handle any errors that occur
            console.error('There was a problem with the fetch operation:', error);
            result.textContent = 'Error: ' + error.message;
    }

}





