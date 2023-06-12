

function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--error");//success removed redirect to landing after login
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}




document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");





    // loginForm.addEventListener("submit", e => {
    //     e.preventDefault();

    //     // Perform your AJAX/Fetch login

    //     setFormMessage(loginForm, "error", "Invalid username or password");
    // });








    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            
            
            if (e.target.id === "username" && !e.target.value )  {
                setInputError(inputElement, "You must provide profile Username");
            }
            
            if (e.target.id === "password" && !e.target.value )  {
                setInputError(inputElement, "You must provide profile Password");
            }   
            if (e.target.id === "username" && (/^ *$/.test(e.target.value)))  {
                setInputError(inputElement, "signupUsername cannot be empty");
            }
            if (e.target.id === "username" && (/[^A-Za-z0-9]/g.test(e.target.value)))  {
                setInputError(inputElement, "Username should only have numbers and alphabets");
            }
            if(e.target.id === "username" && e.target.value.length < 4){
                setInputError(inputElement, "Username should have atleast 4 characters");
                
            }
            if (e.target.id === "password" && (/^ *$/.test(e.target.value)))  {
                setInputError(inputElement, "password cannot be empty");
            }
            
            if(e.target.id === "password" && /\s/g.test(e.target.value)){
                setInputError(inputElement, "password cannot have spaces");
            }

            if(e.target.id === "password" && e.target.value.length < 8){
                setInputError(inputElement, "Password should be atleast 8 characters long");
            }
            
        });
        


        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});


