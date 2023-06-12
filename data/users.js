const ObjectID  = require('mongodb').ObjectId;
const mongoCollections = require('../config/mongoCollections')
const users = mongoCollections.users
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const countries = require("countries-list");

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validateDate(date) {
    let datePattern = /^\d{4}-\d{2}-\d{2}$/ 
        if(!date.match(datePattern)) throw `dateOfReview should be in format yyyy-mm-dd`
        var today = new Date()
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
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
            throw `The month february does not have more than 29 days`
        }

        function leapyear(year)
        {
            return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);
        }

        if(!leapyear(parsedYear) && parsedMonth === 2 && parsedDay === 29){
            throw `Only a leap year can have 29 days in month of February`
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
  

async function createUser(profilePicture, firstName, lastName, username, emailAddress, password, phoneNumber, country, biography, gender, userType, dateOfBirth){
    if(!firstName || !lastName || !username || !emailAddress || !password || !phoneNumber || !country || !biography || !gender || !userType || !dateOfBirth){
        throw {message: `All fields must be supplied`, status:400}
    }

    if(typeof firstName !== "string") throw {message:`firstName must be string`,status:400}
    if(typeof lastName !== "string" ) throw {message:`lastName must be string`,status:400}
    if(typeof emailAddress !== "string") throw {message:'emailAddress must be string',status:400}
    if(typeof password !== "string") throw {message:'password must be string',status:400}
    if(typeof country !== "string") throw {message:'country must be string',status:400}
    if(typeof biography !== "string") throw {message:'biography must be string',status:400}
    if(typeof gender !== "string") throw {message: 'gender must be string',status:400}
    if(typeof userType !== "string") throw {message:'userType must be string',status:400}
    if(typeof phoneNumber !== "string") throw {message:'phoneNumber must be string',status:400}
    if(typeof dateOfBirth !== "string") throw {message:'dateOfBirth must be string',status:400}
    if(typeof username !== "string") throw {message:`userName must be string`,status:400}

    if (/^ *$/.test(firstName)) throw {message:`firstName cannot be empty`,status:400}
    if (/^ *$/.test(lastName)) throw {message:`lastName cannot be empty`,status:400}
    if (/^ *$/.test(emailAddress)) throw {message:`emailAddress cannot be empty`,status:400}
    if (/^ *$/.test(password)) throw {message:`password cannot be empty`,status:400}
    if (/^ *$/.test(country)) throw {message:`country cannot be empty`,status:400}
    if (/^ *$/.test(biography)) throw {message:`biography cannot be empty`,status:400}
    if (/^ *$/.test(gender)) throw {message:`gender cannot be empty`,status:400}
    if (/^ *$/.test(userType)) throw {message:`userType cannot be empty`,status:400}
    if (/^ *$/.test(phoneNumber)) throw {message:`phoneNumber cannot be empty`,status:400}
    if (/^ *$/.test(dateOfBirth)) throw {message:`dateOfBirth cannot be empty`,status:400}
    if (/^ *$/.test(username)) throw {message:`Username cannot be empty`,status:400}

    if(/[^A-Za-z0-9]/g.test(username)){
        throw {message:`Username should only have numbers and alphabets`,status:400}
    }

    if(username.length < 4){
        throw {message:`Username should have atleast 4 characters`,status:400}
    }

    if(!validateEmail(emailAddress)) throw {message:`Please Enter valid Email Address`,status:400}

    if(/\s/g.test(password)) throw {message: `password cannot have spaces`,status:400}
    if(password.length < 8){
        throw {message:`Password should be atleast 8 characters long`,status:400};
    }

    const hashedPwd = await bcrypt.hash(password, saltRounds);
    
    let phoneRe = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/im;
    if(!phoneNumber.match(phoneRe)) throw {message:`Phone number must be in correct format and all numbers`, status: 400};
  
    const countryCodes = Object.keys(countries.countries);
    const countryNames = countryCodes.map(code => countries.countries[code].name);
    
    if (!countryNames.includes(country)) throw {message:`Please enter a valid country`, status: 400};


    let gen = ["Female", "Male", "Other"]

    // if (gender !== "Female" || gender !== "Male" || gender !== "other") throw `Gender must be Male or Female or other`
    
    if(!gen.includes(gender)) throw {message:`Please enter valid gender`, status: 400};
    
    if (userType !== "Patient" && userType !== "Doctor") throw {message:`Usertype must be a patient or a doctor`, status: 400};
    try{
    if (!validateDate(dateOfBirth)) throw {
        message:`Please Enter valid date of birth`, status: 400};
    }
    catch(e){
        throw {message:e, status: 400};
    }

    const userCollection = await users()

    const lowerUser = emailAddress.toLowerCase()
    const userexists = await userCollection.findOne({ emailAddress: lowerUser})
   
    if(userexists) throw  {message:`User with that email address already exists`, status: 400};

    const lowerUsername = username.toLocaleLowerCase()
    const usertaken = await userCollection.findOne({ username: lowerUsername})
    
    if(usertaken) throw {message:`Username already taken`, status: 400};


    let newUser = {
        profilePicture: profilePicture,
        firstName: firstName,
        lastName: lastName,
        username: username.toLowerCase(),
        emailAddress: emailAddress.toLowerCase(),
        password: hashedPwd,
        phoneNumber: phoneNumber,
        country: country,
        biography: biography,
        gender: gender,
        userType: userType,
        dateOfBirth: dateOfBirth
    }

    const insertInfo = await userCollection.insertOne(newUser)
    if (insertInfo.insertCount == 0) throw {message:`Could not add user`,status:400}

    const newId = insertInfo.insertedId.toString();
    const user = await get(newId);

    return JSON.parse(JSON.stringify(user));
}

async function get(id){
    if(!id) throw {message: `You must provide a proper id`, status:400}
    if(typeof id != 'string') throw {message: `${id} is not string`, status: 400}
    if(/^ *$/.test(id)) throw {message: `id with just empty spaces is not valid`, status: 400}

    const userCollection = await users()
    let getId

    try{
        getId = ObjectID(id);
    }
    catch(e){
        throw {message: `Id is invalid because of ${e}`, status: 400}
    }

    const user = await userCollection.findOne({ _id: getId})

    if(user === null) throw {message: `No user exists with that id`, status: 400};

    return JSON.parse(JSON.stringify(user));

}

async function getByUsername(username){
    if(!username) throw {message: `You must provide a proper Username`, status:400}
    if(typeof username != 'string') throw {message: `${username} is not string`, status:400}
    if(/^ *$/.test(username)) throw {message: `username with just empty spaces is not valid`, status:400}

    if(/[^A-Za-z0-9]/g.test(username)){
        throw {message: `Username should only have numbers and alphabets`, status:400}
    }

    if(username.length < 4){
        throw {message: `Username should have atleast 4 characters`, status:400}
    }

    const userCollection = await users()
    
    const user = await userCollection.findOne({ username: username.toLowerCase()})

    if(user === null) throw {message: `No user exists with that username`, status:400};

    return JSON.parse(JSON.stringify(user));

}

async function updateUser(updatedData){
    
        if(updatedData.firstName){
            if(typeof updatedData.firstName !== "string") throw {message: `firstName must be string`, status:400}
            if (/^ *$/.test(updatedData.firstName)) throw {message: `firstName cannot be empty`, status:400}
        }
        
        if(updatedData.lastName){
            if(typeof updatedData.lastName !== "string" ) throw {message: `lastName must be string`, status:400}
            if (/^ *$/.test(updatedData.lastName)) throw {message: `lastName cannot be empty`, status:400}
        }
        
        if(updatedData.emailAddress){
            if(typeof updatedData.emailAddress !== "string") throw {message:'emailAddress must be string', status:400}
            if (/^ *$/.test(updatedData.emailAddress)) throw {message: `emailAddress cannot be empty`, status:400}
            if(!validateEmail(updatedData.emailAddress)) throw {message:`Please Enter valid Email Address`,status:400}
        }

        if(updatedData.country){
            if(typeof updatedData.country !== "string") throw {message:'country must be string', status:400}
            if (/^ *$/.test(updatedData.country)) throw {message: `country cannot be empty`,status:400}
            const countryCodes = Object.keys(countries.countries);
            const countryNames = countryCodes.map(code => countries.countries[code].name);
            if (!countryNames.includes(updatedData.country)) throw {message: `Please enter a valid country`, status:400}
        }

        if(updatedData.biography){
            if(typeof updatedData.biography !== "string") throw {message: 'biography must be string', status:400}
            if (/^ *$/.test(updatedData.biography)) throw {message: `biography cannot be empty`, status:400}
        }

        if(updatedData.gender){
            if(typeof updatedData.gender !== "string") throw {message: 'gender must be string', status:400}
            if (/^ *$/.test(updatedData.gender)) throw {message: `gender cannot be empty`, status:400}
            let gen = ["Female", "Male", "Other"]
            if(!gen.includes(updatedData.gender)) throw {message:`Please enter valid gender`, status: 400};
        }

        if(updatedData.phoneNumber){
            if(typeof updatedData.phoneNumber !== "string") throw {message: 'phoneNumber must be string', status:400}
            if (/^ *$/.test(updatedData.phoneNumber)) throw {message: `phoneNumber cannot be empty`, status:400}
            let phoneRe = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
            if(!updatedData.phoneNumber.match(phoneRe)) throw {message: `Phone number must be all numbers and correct format`, status:400}
    
        }
       
       
        if(typeof updatedData.username !== "string") throw {message: `userName must be string`, status:400}
        if (/^ *$/.test(updatedData.username)) throw {message: `Username cannot be empty`, status: 400}
        if(/[^A-Za-z0-9]/g.test(updatedData.username)){
            throw {message: `Username should only have numbers and alphabets`, status:400}
        }
        if(updatedData.username.length < 4){
            throw {message: `Username should have atleast 4 characters`, status:400}
        }

        const userCollection = await users()

        if(updatedData.emailAddress){
            const lowerUser = updatedData.emailAddress.toLowerCase()
            const userexists = await userCollection.findOne({ emailAddress: lowerUser, username: {$ne: updatedData.username}})
            if(userexists) throw {message: `User with that email address already exists`, status:400}
        }
        // let updateId
    
        // try{
        //     updateId = ObjectID(id);
        // }
        // catch(e){
        //     throw `Id is invalid because of ${e}`
        // }
    
        const user = await userCollection.findOne({ username: updatedData.username})
        if(user === null || user === undefined) throw {message: `username doesn't exist.`, status:400}
    
        let exisistingUser = await getByUsername(updatedData.username)
        // let updatedUser = {}
    
        let updatedUser = {
            profilePicture: String,
            firstName: String,
            lastName: String,
            username: exisistingUser.username,
            emailAddress: String,
            password: exisistingUser.password,
            phoneNumber: String,
            country: String,
            biography: String,
            gender: String,
            userType: exisistingUser.userType,
            dateOfBirth: exisistingUser.dateOfBirth
        }
        
        if(updatedData.profilePicture){
            updatedUser.profilePicture = updatedData.profilePicture
        }
        else{
            updatedUser.profilePicture = exisistingUser.profilePicture
        }

        if(updatedData.firstName){
            if(updatedData.firstName.trim() !== ""){
                updatedUser.firstName = updatedData.firstName
            }
            else{
                updatedUser.firstName = exisistingUser.firstName
            }
        }

        if(updatedData.lastName){
            if(updatedData.lastName.trim() !== ""){
                updatedUser.lastName = updatedData.lastName
            }
            else{
                updatedUser.lastName = exisistingUser.lastName
            }
        }

        if(updatedData.emailAddress){
            if(updatedData.emailAddress.trim() !== ""){
                updatedUser.emailAddress = updatedData.emailAddress.toLowerCase()
            }
            else{
                updatedUser.emailAddress = exisistingUser.emailAddress
            }
        }

        if(updatedData.country){
            if(updatedData.country.trim() !== ""){
                updatedUser.country = updatedData.country
            }
            else{
                updatedUser.country = exisistingUser.country
            }
        }

        if(updatedData.phoneNumber){
            if(updatedData.phoneNumber.trim() !== ""){
                updatedUser.phoneNumber = updatedData.phoneNumber
            }
            else{
                updatedUser.phoneNumber = exisistingUser.phoneNumber
            }
        }

        if(updatedData.biography){
            if(updatedData.biography.trim() !== ""){
                updatedUser.biography = updatedData.biography
            }
            else{
                updatedUser.biography = exisistingUser.biography
            }
        }

        if(updatedData.gender){
            if(updatedData.gender.trim() !== ""){
                updatedUser.gender = updatedData.gender
            }
            else{
                updatedUser.gender = exisistingUser.gender
            }
        }

        const updatedInfo = await userCollection.updateOne({username: updatedData.username}, {$set: updatedUser});
        if (updatedInfo.matchedCount === 0 && updatedInfo.modifiedCount === 0) {
            throw {message: `could not update User`, status:400};
        }  
    
        return {userUpdated: true}
    }

async function checkUser(username, password){
    if(!username || !password){
        throw {message:`All fields need to have valid values`,status:400};
    }

    if(typeof username !== 'string' || /^ *$/.test(username)){
        throw {message:`Please enter a valid string`,status:400};
    }

    if(/[^A-Za-z0-9]/g.test(username)){
        throw {message: `Username should only have numbers and alphabets`,status:400};
    }

    if(username.length < 4){
        throw {message: `Username should have atleast 4 characters`,status:400};
    }

    if(/^ *$/.test(password)) throw {message: `password cannot be empty`,status:400};

    if(/\s/g.test(password)) throw {message:`password cannot have spaces`,status:400};

    if(password.length < 8){
        throw {message:`Password should be atleast 8 characters long`,status:400};
    }

    const userCollection = await users()
    const user = await userCollection.findOne({ username: username.toLowerCase()})

    if(user === null) throw {message:`Either the username or password is invalid`,status:400};

    let compareToMatch = false;

    try {
        compareToMatch = await bcrypt.compare(password, user.password);
    } catch (e) {
        //no op
    }

    if (compareToMatch) {
        return {authenticated: true}
    } else {
        throw {message:`Either the username or password is invalid`,status:400};
    }

}

async function searchUser(searchTerm){
    if(searchTerm==null || searchTerm==undefined)
    {
        throw {message: `Search Term must be provided in the function`, status: 400};
    }

    if(typeof(searchTerm)!=='string'){
        throw {message: 'The searchTerm should be string. No Other Datatype is allowed!', status: 400}
    }

    if(/^ *$/.test(searchTerm)){
        throw {message: `Enter Something to search`, status:400}
    }

    const userCollection = await users()
    let searchLower = searchTerm.toLowerCase()

    const user = await userCollection.findOne({ username: searchLower})

    if(user)
    {
        return {firstName:user.firstName,lastName:user.lastName,username:user.username}
    }
    else
    {
        return null;
    }


}


module.exports = {
    createUser,
    get,
    updateUser,
    checkUser,
    getByUsername,
    searchUser
}


