// document.getElementById("createAccount").reset();

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


//----------------function to validate Email---------------------------//
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
//---------------End of function to validate Email----------------------//


//--------------function to Validate Date----------------//
function validateDate(date) {
    let datePattern = /^\d{4}-\d{2}-\d{2}$/ 
        if(!date.match(datePattern)) throw `dateOfReview should be in format yyyy-mm-dd`
        const today = new Date()
        let date_arr = date.split("-")
        parsedMonth = Number(date_arr[1])
        parsedDay = Number(date_arr[2])
        parsedYear = Number(date_arr[0])
        if(parsedMonth < 1 || parsedMonth > 12){
            throw `Invalid month`
        }
        if(parsedDay < 1 || parsedDay > 31){
            throw 'Invalid Day value'
        }
        monthArr1 = [1, 3, 5, 7, 8, 10, 12]
        monthArr2 = [4, 6, 9, 11]
        if(monthArr1.includes(parsedMonth) && parsedDay > 31){
            throw `The month does not have more than 31 days`
        }
        else if(monthArr2.includes(parsedMonth) && parsedDay > 30){
            throw `The month does not have more than 30 days`
        }
        else if(parsedMonth === 2 && parsedDay > 29 ){
            throw `The month february does not have more than 28 days`
        }

        function leapyear(year)
        {
            return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);
        }

        if(!leapyear(parsedYear) && parsedMonth === 2 && parsedDay === 29){
            throw {message: `Only a leap year can have 29 days in month of February`}
        }
        
        let d1 = new Date(Date.parse(date));
        let d2 = new Date(Date.parse(today));
        var diff = d2.getTime() - d1.getTime();

        if (diff < 0) {
            return false; 
        } else {
            return true;
        }
    
}

//--------------End of Function to Validate Date----------------//











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
            
            if (e.target.id == "firstName" && !e.target.value )  {
                setInputError(inputElement, "You must provide profile First Name");
              }
            if (e.target.id === "lastName" && !e.target.value )  {
                setInputError(inputElement, "You must provide profile Last Name");
            }
            if (e.target.id === "signupUsername" && !e.target.value )  {
                setInputError(inputElement, "You must provide profile Username");
            }
            if (e.target.id === "emailAddress" && !e.target.value )  {
                setInputError(inputElement, "You must provide profile Email Address");
            }
            if (e.target.id === "password" && !e.target.value )  {
                setInputError(inputElement, "You must provide profile Password");
            }   
            if (e.target.id === "phoneNumber" && !e.target.value )  {
                setInputError(inputElement, "You must provide profile Phone Number");
            } 
            if (e.target.id === "country" && !e.target.value )  {
                setInputError(inputElement, "You must provide profile Country");
            } 
            if (e.target.id === "biography" && !e.target.value )  {
                setInputError(inputElement, "You must provide profile Biography");
            }
            if (e.target.id === "gender" && !e.target.value )  {
                setInputError(inputElement, "You must provide Gender");
            }
            if (e.target.id === "userType" && !e.target.value )  {
                setInputError(inputElement, "You must provide UserType");
            }
            if (e.target.id === "dateOfBirth" && !e.target.value )  {
                setInputError(inputElement, "You must provide Date of Birth");
            } 
            //password implement     
            if (e.target.id === "firstName" && (/^ *$/.test(e.target.value)))  {
                setInputError(inputElement, "Firstname cannot be empty");
            }
            if (e.target.id === "lastName" && (/^ *$/.test(e.target.value)))  {
            setInputError(inputElement, "Lastname cannot be empty");
            } 
            if (e.target.id === "signupUsername" && (/^ *$/.test(e.target.value)))  {
                setInputError(inputElement, "signupUsername cannot be empty");
            }
            if (e.target.id === "emailAddress" && (/^ *$/.test(e.target.value)))  {
                setInputError(inputElement, "emailAddress cannot be empty");
            }
            if (e.target.id === "password" && (/^ *$/.test(e.target.value)))  {
                setInputError(inputElement, "password cannot be empty");
            }
            if (e.target.id === "phoneNumber" && (/^ *$/.test(e.target.value)))  {
                setInputError(inputElement, "phoneNumber cannot be empty");
            }
            if (e.target.id === "country" && (/^ *$/.test(e.target.value)))  {
                setInputError(inputElement, "country cannot be empty");
            }
            if (e.target.id === "biography" && (/^ *$/.test(e.target.value)))  {
                setInputError(inputElement, "Biography cannot be empty");
            } 
            if (e.target.id === "gender" && (/^ *$/.test(e.target.value)))  {
                setInputError(inputElement, "genderList cannot be empty");
            }
            if (e.target.id === "userType" && (/^ *$/.test(e.target.value)))  {
                setInputError(inputElement, "userType cannot be empty");
            }
            if (e.target.id === "dateOfBirth" && (/^ *$/.test(e.target.value)))  {
                setInputError(inputElement, "dateOfBirth cannot be empty");
            }   

            if (e.target.id === "signupUsername" && (/[^A-Za-z0-9]/g.test(e.target.value)))  {
                setInputError(inputElement, "Username should only have numbers and alphabets");
            }
            if(e.target.id === "signupUsername" && e.target.value.length < 4){
                setInputError(inputElement, "Username should have atleast 4 characters");
            }
            if(e.target.id === "emailAddress" && !validateEmail(e.target.value)){
                setInputError(inputElement, "Please enter valid Email Address");
            }


            if(e.target.id === "password" && /\s/g.test(e.target.value)){
                setInputError(inputElement, "password cannot have spaces");
            }

            if(e.target.id === "password" && e.target.value.length < 8){
                setInputError(inputElement, "Password should be atleast 8 characters long");
            }
            let phoneRe = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/im;
            if(e.target.id === "phoneNumber" && !e.target.value.match(phoneRe)){
                setInputError(inputElement, "Phone number must be of correct format and all numbers");
            }

            let gen = ["Female", "Male", "Other"]
            if(e.target.id === "gender" && !gen.includes(e.target.value)){
                setInputError(inputElement, "Please Enter valid gender");
            }
        
        
            if (e.target.id.trim() === "userType" && e.target.value.trim() != "Patient" && e.target.value.trim() != "Doctor"){
                setInputError(inputElement, "Usertype must be a patient or a doctor"); 
            }

            try{ 
                if (e.target.id === "dateOfBirth" && !e.target.value){
                    setInputError(inputElement, "Please Enter valid date of birth"); 

                }
                else if(e.target.id === "dateOfBirth")
                {
                    isvalid = validateDate(e.target.value)
                    if(isvalid == false)
                    {
                        setInputError(inputElement, "Please Enter valid date of birth"); 
                    }
                }
                }
                catch(e2){
                    setInputError(inputElement, e2);
            
                }
        });
        


        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});


