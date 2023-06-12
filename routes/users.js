const express = require('express');
const data = require('../data');
const usersData = data.users;
const multer = require("multer");
const mongoCollections = require('../config/mongoCollections')
const userColl = mongoCollections.users;
const ObjectID  = require('mongodb').ObjectId;
const router = express.Router();
const countries = require("countries-list");
const { updateUser } = require('../data/users');
const xss = require('xss');


//-------------for Storing Images------------------//
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/images/users")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname.replace(" ", "_") + '-' + Date.now())
    }
})


const upload = multer({ storage: storage })
//-----------End of storing images-----------------------

router.get('/updateProfile', async (req, res) => {
    try{
        if(req.session.user){
            let countryCodes = Object.keys(countries.countries);
            let countryNames = countryCodes.map(code => countries.countries[code].name);
            let genderList = ["Female", "Male", "Other"]
            const userdata = await usersData.getByUsername(req.session.user)
            const index = countryNames.indexOf(userdata.country);
            if (index > -1) {
            countryNames.splice(index, 1);
            }
            const index1 = genderList.indexOf(userdata.gender);
            if (index1 > -1) {
            genderList.splice(index1, 1);
            }

            res.render("users/updateProfile", {profilePicture: userdata.profilePicture, firstName: userdata.firstName, lastName: userdata.lastName, biography: userdata.biography, phoneNumber: userdata.phoneNumber, emailAddress: userdata.emailAddress, name: req.session.user, countryNames: countryNames, country: userdata.country, genderList: genderList, gender: userdata.gender, title: "Update User Profile"})  
        }
        else{
            res.redirect("/login")
        }
    }catch(e){
        res.status(e.status || 500).render("users/error", {title: "Error", error: e.message})
    }
})

//-------------Post Profile-----------------------------
router.post('/updateProfile', upload.single('profilePicture'), async (req, res) => {
    try {
        if(req.session.user){
            const userdata = req.body
            let countryCodes = Object.keys(countries.countries);
            let countryNames = countryCodes.map(code => countries.countries[code].name);
            let genderList = ["Female", "Male", "Other"]
            if(req.file) userdata.profilePicture = xss(req.file.filename);
            userdata.username = req.session.user
            let existingUserData;
            try {
            existingUserData = await usersData.getByUsername(userdata.username);
            } catch (e) {
            res.status(404).render("error/error", {error: "User not found", title: "error"});
            return;
            }

            const index = countryNames.indexOf(existingUserData.country);
            if (index > -1) {
            countryNames.splice(index, 1);
            }
            const index1 = genderList.indexOf(existingUserData.gender);
            if (index1 > -1) {
            genderList.splice(index1, 1);
            }


            if(!userdata.firstName || !userdata.lastName || !userdata.biography || !userdata.phoneNumber || !userdata.emailAddress || !userdata.country || !userdata.gender){
                // throw {message: `one of the mendatory field is missing`, status:400}
                res.status(200).render("users/updateProfile", {profilePicture: existingUserData.profilePicture, firstName:existingUserData.firstName, lastName: existingUserData.lastName, biography: existingUserData.biography, gender:existingUserData.gender, country:existingUserData.country, phoneNumber:existingUserData.phoneNumber, emailAddress:existingUserData.emailAddress ,error: "one of the mendatory field is missing", name: req.session.user, countryNames: countryNames, genderList: genderList, title: "Update User Profile"})
                return
            }

            if((typeof userdata.firstName !== "string") || (/^ *$/.test(userdata.firstName))){
                res.status(200).render("users/updateProfile", {profilePicture: existingUserData.profilePicture, firstName:existingUserData.firstName, lastName: existingUserData.lastName, biography: existingUserData.biography, gender:existingUserData.gender, country:existingUserData.country, phoneNumber:existingUserData.phoneNumber, emailAddress:existingUserData.emailAddress ,error: "Please Enter valid Firstname", name: req.session.user, countryNames: countryNames, genderList: genderList, title: "Update User Profile"})
                return
            }

            if((typeof userdata.lastName !== "string") || (/^ *$/.test(userdata.lastName))){
                res.status(200).render("users/updateProfile", {profilePicture: existingUserData.profilePicture, firstName:existingUserData.firstName, lastName: existingUserData.lastName, biography: existingUserData.biography, gender:existingUserData.gender, country:existingUserData.country, phoneNumber:existingUserData.phoneNumber, emailAddress:existingUserData.emailAddress ,error: "Please Enter valid Lastname", name: req.session.user, countryNames: countryNames, genderList: genderList, title: "Update User Profile"})
                return
            }

            if((typeof userdata.biography !== "string") || (/^ *$/.test(userdata.biography))){
                res.status(200).render("users/updateProfile", {profilePicture: existingUserData.profilePicture, firstName:existingUserData.firstName, lastName: existingUserData.lastName, biography: existingUserData.biography, gender:existingUserData.gender, country:existingUserData.country, phoneNumber:existingUserData.phoneNumber, emailAddress:existingUserData.emailAddress ,error: "Please Enter valid Biography", name: req.session.user, countryNames: countryNames, genderList: genderList, title: "Update User Profile"})
                return
            }

            let countryCodes1 = Object.keys(countries.countries);
            let countryNames1 = countryCodes1.map(code => countries.countries[code].name);


            if((typeof userdata.country !== "string") || (/^ *$/.test(userdata.country)) ||  (!countryNames1.includes(userdata.country))){
                res.status(200).render("users/updateProfile", {profilePicture: existingUserData.profilePicture, firstName:existingUserData.firstName, lastName: existingUserData.lastName, biography: existingUserData.biography, gender:existingUserData.gender, country:existingUserData.country, phoneNumber:existingUserData.phoneNumber, emailAddress:existingUserData.emailAddress ,error: "Please Enter valid country", name: req.session.user, countryNames: countryNames, genderList: genderList, title: "Update User Profile"})
                return
            }

            let gen = ["Female", "Male", "Other"]
            if((typeof userdata.gender !== "string") || (/^ *$/.test(userdata.gender)) ||  (!gen.includes(userdata.gender))){
                res.status(200).render("users/updateProfile", {profilePicture: existingUserData.profilePicture, firstName:existingUserData.firstName, lastName: existingUserData.lastName, biography: existingUserData.biography, gender:existingUserData.gender, country:existingUserData.country, phoneNumber:existingUserData.phoneNumber, emailAddress:existingUserData.emailAddress ,error: "Please Enter valid country", name: req.session.user, countryNames: countryNames, genderList: genderList, title: "Update User Profile"})
                return
            }

            let phoneRe = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
            if((typeof userdata.phoneNumber !== "string") || (/^ *$/.test(userdata.phoneNumber) || !userdata.phoneNumber.match(phoneRe))){
                res.status(200).render("users/updateProfile", {profilePicture: existingUserData.profilePicture, firstName:existingUserData.firstName, lastName: existingUserData.lastName, biography: existingUserData.biography, gender:existingUserData.gender, country:existingUserData.country, phoneNumber:existingUserData.phoneNumber, emailAddress:existingUserData.emailAddress ,error: "Please Enter valid phoneNumber", name: req.session.user, countryNames: countryNames, genderList: genderList, title: "Update User Profile"})
                return
            }

            if((typeof userdata.emailAddress !== "string") || (/^ *$/.test(userdata.emailAddress) || !validateEmail(userdata.emailAddress))){
                res.status(200).render("users/updateProfile", {profilePicture: existingUserData.profilePicture, firstName:existingUserData.firstName, lastName: existingUserData.lastName, biography: existingUserData.biography, gender:existingUserData.gender, country:existingUserData.country, phoneNumber:existingUserData.phoneNumber, emailAddress:existingUserData.emailAddress ,error: "Please Enter valid Email", name: req.session.user, countryNames: countryNames, genderList: genderList, title: "Update User Profile"})
                return
            }

            const userCollection = await userColl();
            const checkEmail = await userCollection.findOne({ emailAddress: userdata.emailAddress.toLowerCase(), username : {$ne: req.session.user}});
            if(checkEmail !== null) {
                res.status(200).render("users/updateProfile", {profilePicture: existingUserData.profilePicture, firstName:existingUserData.firstName, lastName: existingUserData.lastName, biography: existingUserData.biography, gender:existingUserData.gender, country:existingUserData.country, phoneNumber:existingUserData.phoneNumber, emailAddress:existingUserData.emailAddress ,error: "User with that email address already exists.", name: req.session.user, countryNames: countryNames, genderList: genderList, title: "Update User Profile"})
                return
            }

            let updatedUserinfo = {}
            updatedUserinfo.username = req.session.user
            if(existingUserData.profilePicture !== userdata.profilePicture){
                updatedUserinfo.profilePicture = userdata.profilePicture
            }

            if(existingUserData.firstName !== userdata.firstName){
                updatedUserinfo.firstName = userdata.firstName
            }

            if(existingUserData.lastName !== userdata.lastName){
                updatedUserinfo.lastName = userdata.lastName
            }

            if(existingUserData.biography !== userdata.biography){
                updatedUserinfo.biography = userdata.biography
            }

            if(existingUserData.country !== userdata.country){
                updatedUserinfo.country = userdata.country
            }

            if(existingUserData.gender !== userdata.gender){
                updatedUserinfo.gender = userdata.gender
            }

            if(existingUserData.phoneNumber !== userdata.phoneNumber){
                updatedUserinfo.phoneNumber = userdata.phoneNumber
            }

            if(existingUserData.emailAddress !== userdata.emailAddress){
                updatedUserinfo.emailAddress = userdata.emailAddress
            }

            const userInfo = await usersData.updateUser(updatedUserinfo)
            const user = await usersData.getByUsername(userdata.username)
            res.render("users/userProfile", {profilePicture: user.profilePicture, firstName: user.firstName, lastName: user.lastName, biography: user.biography, gender: user.gender, phoneNumber: user.phoneNumber, emailAddress: user.emailAddress.toLowerCase(), country: user.country, name: req.session.user, title: "User Profile"})
    }
    else{
        res.redirect("/login")
    }
    } catch(err) {
      res.status(err.status || 500).render("error/error", {error: err, title: "error"});
    }
  });
//-------------End Post Profile----------------------//


//------------Get Profile-------------------------//
router.get('/profile', async (req, res) => {
    try{
        if(req.session.user){
            const userdata = await usersData.getByUsername(req.session.user)
            res.render("users/userProfile", {profilePicture: userdata.profilePicture, firstName: userdata.firstName, lastName: userdata.lastName, biography: userdata.biography, gender: userdata.gender, phoneNumber: userdata.phoneNumber, emailAddress: userdata.emailAddress, country: userdata.country, name: req.session.user, title: "User Profile"})
        }
        else{
            res.redirect("/")
            // res.render("users/error")
        }
    }catch(e){
        res.status(404).render("error/error", {error: e.message, title: "error"})
    }
})
//--------------End of get Profile----------------//


router.get('/profile/:id', async (req, res) => {
    serchTerm = req.params.id

    try{
    const profile_list = await usersData.searchUser(serchTerm)
    return res.json(profile_list);}
    catch(e)
    {
       res.status(e.status || 500).render("error/error", {error: e.message, title: "Error"})
    }

})

router.get('/searchProfile/:id', async (req, res) => {
    try{
    if(req.session.user){
      
        const searchTerm = req.params.id
        if(searchTerm === req.session.user){
            res.redirect("/profile")
        }
        else{
            const userdata = await usersData.getByUsername(searchTerm)
            res.render("users/searchProfile", {profilePicture: userdata.profilePicture, firstName: userdata.firstName, lastName: userdata.lastName, biography: userdata.biography, gender: userdata.gender, phoneNumber: userdata.phoneNumber, emailAddress: userdata.emailAddress, country: userdata.country, name: req.session.user, title: "User Profile"} )
        }
    }
    else{
        res.redirect("/login");
    }
    }catch(e){
        res.status(e.status || 500).render("error/error", {error: e.message, title: "Error"})
    }

})
  
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




//------------get Landing Page--------------------//
router.get('/',async (req, res) => {
    try{
    if (req.session.user) {
        res.render('homepage/Landingpage',{title: "Share and Care",name:req.session.user});
      } else {
        res.render('homepage/Landingpage',{title: "Share and Care"});
       
      }
    }catch(e){
        res.render("error/error", {title: "error"})
    }
    
    
  });
//-----------End of get landing Page---------------//



//-------------get SignUp Page-------------------//
router. get('/signup',async (req, res) => { 
    try{
    if (req.session.user) {
        return res.redirect('/');
      } else {
        const countryCodes = Object.keys(countries.countries);
        const countryNames = countryCodes.map(code => countries.countries[code].name);
        res.render("users/signup",{title: "SIGNUP", countryNames: countryNames});
      } 
    }
    catch(e){
        res.render("error/error", {title: "error"})
    }    
  });
//------------end of Get SignUp page--------------//


//-------------Post Sign Up--------------------//
  router.post('/signup', upload.single('profilePicture'), async (req, res) => {
      try{
    // if (!req.file)  {
    //     res.status(400).render('users/signup',{ title:"signUp",error: 'You must provide Profile picture'});
    //     return;
    // }

    const countryCodes = Object.keys(countries.countries);
    const countryNames = countryCodes.map(code => countries.countries[code].name);

    if (!req.body.firstName )  {
        res.status(400).render('users/signup',{ title:"signUp",error: 'You must provide First Name', countryNames: countryNames});
        return;
      }
    if (!req.body.lastName )  {
        res.status(400).render('users/signup',{ title:"signUp",error: 'You must provide profile Last Name', countryNames: countryNames});
        return;
      }
    if (!req.body.username )  {
        res.status(400).render('users/signup',{ title:"signUp",error: 'You must provide profile Username', countryNames: countryNames});
        return;
      }  
    if (!req.body.emailAddress )  {
        res.status(400).render('users/signup',{ title:"signUp",error: 'You must provide profile Email Address', countryNames: countryNames});
        return;
      } 
    if (!req.body.password )  {
        res.status(400).render('users/signup',{ title:"signUp",error: 'You must provide profile Password', countryNames: countryNames});
        return;
      } 
    if (!req.body.phoneNumber )  {
        res.status(400).render('users/signup',{ title:"signUp",error: 'You must provide profile Phone Number', countryNames: countryNames});
        return;
      } 
    if (!req.body.country )  {
        res.status(400).render('users/signup',{ title:"signUp",error: 'You must provide profile Country', countryNames: countryNames});
        return;
    }
    if (!req.body.biography )  {
        res.status(400).render('users/signup',{ title:"signUp",error: 'You must provide profile Biography', countryNames: countryNames});
        return;
    }
    if (!req.body.gender)  {
        res.status(400).render('users/signup',{ title:"signUp",error: 'You must provide Gender', countryNames: countryNames});
        return;
    }
    if (!req.body.userType)  {
        res.status(400).render('users/signup',{ title:"signUp",error: 'You must provide UserType', countryNames: countryNames});
        return;
    }
    if (!req.body.dateOfBirth)  {
        res.status(400).render('users/signup',{ title:"signUp",error: 'You must provide Date of Birth', countryNames: countryNames});
        return;
    }
    if(typeof req.body.firstName !== "string") {
        res.status(400).render('users/signup',{ title:"signUp",error: 'Firstname must be string', countryNames: countryNames});
        return; 
    }
    if(typeof req.body.lastName !== "string" ) {
        res.status(400).render('users/signup',{ title:"signUp",error: 'Lastname must be string', countryNames: countryNames});
        return; 
    }
    if(typeof req.body.emailAddress !== "string"){
        res.status(400).render('users/signup',{ title:"signUp",error: 'EmailAddress must be string', countryNames: countryNames});
        return; 
    }
    if(typeof req.body.password !== "string"){
        res.status(400).render('users/signup',{ title:"signUp",error: 'Password must be string', countryNames: countryNames});
        return;   
    }
    if(typeof req.body.country !== "string"){
        res.status(400).render('users/signup',{ title:"signUp",error: 'Country must be string', countryNames: countryNames});
        return; 
    }
    if(typeof req.body.biography !== "string"){
        res.status(400).render('users/signup',{ title:"signUp",error: 'Biography must be string', countryNames: countryNames});
        return;
    }
    if(typeof req.body.gender !== "string"){
        res.status(400).render('users/signup',{ title:"signUp",error: 'Gender must be string', countryNames: countryNames});
        return; 
    }
    if(typeof req.body.userType !== "string"){
        res.status(400).render('users/signup',{ title:"signUp",error: 'UserType must be string', countryNames: countryNames});
        return; 
    }
    if(typeof req.body.phoneNumber !== "string"){
        res.status(400).render('users/signup',{ title:"signUp",error: 'PhoneNumber must be string', countryNames: countryNames});
        return; 
    }
    if(typeof req.body.dateOfBirth !== "string"){
        res.status(400).render('users/signup',{ title:"signUp",error: 'DateOfBirth must be string', countryNames: countryNames});
        return; 
    }
    if(typeof req.body.username !== "string"){
        res.status(400).render('users/signup',{ title:"signUp",error: 'UserName must be string', countryNames: countryNames});
        return; 
    }

    if (/^ *$/.test(req.body.firstName)){
        res.status(400).render('users/signup',{ title:"signUp",error: 'Firstname cannot be empty', countryNames: countryNames});
        return; 
    }
    if (/^ *$/.test(req.body.lastName)){
        res.status(400).render('users/signup',{ title:"signUp",error: 'Lastname cannot be empty', countryNames: countryNames});
        return; 
    }
    if (/^ *$/.test(req.body.emailAddress)){
        res.status(400).render('users/signup',{ title:"signUp",error: 'EmailAddress cannot be empty', countryNames: countryNames});
        return;
    }
    if (/^ *$/.test(req.body.password)){
        res.status(400).render('users/signup',{ title:"signUp",error: 'Password cannot be empty', countryNames: countryNames});
        return; 
    }
    if (/^ *$/.test(req.body.country)){
        res.status(400).render('users/signup',{ title:"signUp",error: 'Country cannot be empty', countryNames: countryNames});
        return;
    }
    if (/^ *$/.test(req.body.biography)){
        res.status(400).render('users/signup',{ title:"signUp",error: 'Biography cannot be empty', countryNames: countryNames});
        return;
    }
    if (/^ *$/.test(req.body.gender)){
        res.status(400).render('users/signup',{ title:"signUp",error: 'Gender cannot be empty', countryNames: countryNames});
        return;
    }
    if (/^ *$/.test(req.body.userType)){
        res.status(400).render('users/signup',{ title:"signUp",error: 'UserType cannot be empty', countryNames: countryNames});
        return;
    }
    if (/^ *$/.test(req.body.phoneNumber)){
        res.status(400).render('users/signup',{ title:"signUp",error: 'PhoneNumber cannot be empty', countryNames: countryNames});
        return;
    }
    if (/^ *$/.test(req.body.dateOfBirth)){
        res.status(400).render('users/signup',{ title:"signUp",error: 'DateOfBirth cannot be empty', countryNames: countryNames});
        return;
    }
    if (/^ *$/.test(req.body.username)){
        res.status(400).render('users/signup',{ title:"signUp",error: 'Username cannot be empty', countryNames: countryNames});
        return;
    }


    if(/[^A-Za-z0-9]/g.test(req.body.username)){
        res.status(400).render('users/signup',{ title:"signUp",error: 'Username should only have numbers and alphabets', countryNames: countryNames});
        return;
    }

    if(req.body.username.length < 4){
        res.status(400).render('users/signup',{ title:"signUp",error: 'Username should have atleast 4 characters', countryNames: countryNames});
        return;
    }
    
    if(!validateEmail(req.body.emailAddress)){
        res.status(400).render('users/signup',{ title:"signUp",error: 'Please Enter valid Email Address', countryNames: countryNames});
        return;
    }

    if(/\s/g.test(req.body.password)){
        res.status(400).render('users/signup',{ title:"signUp",error: 'password cannot have spaces', countryNames: countryNames});
        return;  
    }
    if(req.body.password.length < 8){
        res.status(400).render('users/signup',{ title:"signUp",error: 'Password should be atleast 8 characters long', countryNames: countryNames});
        return; 
    }
    let phoneRe = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/im;
    if(!req.body.phoneNumber.match(phoneRe)){
        res.status(400).render('users/signup',{ title:"signUp",error: 'Phone number must be of correct format and all numbers', countryNames: countryNames});
        return
    }
 
    if (!countryNames.includes(req.body.country)){
        res.status(400).render('users/signup',{ title:"signUp",error: 'Please enter a valid country', countryNames: countryNames});
        return
    }
    let gen = ["Female", "Male", "Other"]
    if(!gen.includes(req.body.gender)){
        res.status(400).render('users/signup',{ title:"signUp",error: 'Please enter valid gender', countryNames: countryNames});
        return
    }


    if (req.body.userType.trim() != "Patient" && req.body.userType.trim() != "Doctor"){
        res.status(400).render('users/signup',{ title:"signUp",error: 'Usertype must be a patient or a doctor', countryNames: countryNames});
        return  
    }
    
     try{ 
    if (!validateDate(req.body.dateOfBirth)){
        res.status(400).render('users/signup',{ title:"signUp",error: 'Please Enter valid date of birth', countryNames: countryNames});
        return
    }
    }
    catch(e){
        res.status(400).render('users/signup',{ title:"signUp",error: e, countryNames: countryNames});
        return

    }

   

    try{
        const user_data = req.body;
        if(req.file){
            user_data.profilePicture = req.file.filename;
        }
        else{
            user_data.profilePicture = null;
        }
        const { profilePicture, firstName, lastName, username, emailAddress, password, phoneNumber, country, biography, gender, userType, dateOfBirth} = user_data;
        const postSignup = await usersData.createUser(profilePicture, firstName, lastName, username, emailAddress, password, phoneNumber, country, biography, gender, userType, dateOfBirth);
       
        if(postSignup){
                return res.redirect('/login');
            }

            
        }
    catch(e){
        res.status(e.status || 500).render('users/signup',{title:"signUp",error: e.message ||`Internal Server Error`})
    }
    }catch(e){
    res.status(e.status || 500).render("error/error", {title: "Error", error: e.message})
   }
  })

//------------End of Post Signup------------------------//



//--------------Get Login---------------------//

  router.get('/login',async (req, res) => {
      try{
    if (req.session.user) {
        return res.redirect('/');
      } else {
        res.render("users/login",{title: "LOGIN"});
      }
    }catch(e){
        res.render("error/error", {title: "Error"})
    }
  });  
  
  //--------------End of Get Login----------------------//
  
  
  //--------------Post Login---------------------------//
  router.post('/login',async (req, res) => {
      try{
    if (!req.body.username )  {
        res.status(400).render('users/Login',{ title:"login",error: 'You must provide Username'});
        return;
      }
    if (!req.body.password )  {
        res.status(400).render('users/Login',{ title:"login",error: 'You must provide Password'});
        return;
    } 
    if(typeof req.body.username !== 'string'){
        res.status(400).render('users/Login',{ title:"login",error: 'Please enter a valid string'});
        return;
    }
      
    if(/^ *$/.test(req.body.username)){
        res.status(400).render('users/Login',{ title:"login",error: 'Username cannot be empty'});
        return;
    }
    if(/[^A-Za-z0-9]/g.test(req.body.username)){
        res.status(400).render('users/Login',{ title:"login",error: 'Username should only have numbers and alphabets'});
        return;
    }
    if(req.body.username.length < 4){
        res.status(400).render('users/Login',{ title:"login",error: 'Username should have atleast 4 characters'});
        return;
    }

    if(/^ *$/.test(req.body.password)){
        res.status(400).render('users/Login',{ title:"login",error: 'password cannot be empty'});
        return;
    }

    if(/\s/g.test(req.body.password)){
        res.status(400).render('users/Login',{ title:"login",error: 'password cannot have spaces'});
        return;
    }

    if(req.body.password.length < 8){
        res.status(400).render('users/Login',{ title:"login",error: 'Password should be atleast 8 characters long'});
        return;
    }
 
    
    try{
        const postLogIn = await usersData.checkUser(req.body.username,req.body.password);
      if(postLogIn.authenticated){
          req.session.user = req.body.username.toLowerCase();
          return res.redirect("/");
          
      }
    }
    catch(e){
        res.status(e.error || 500).render('users/login',{title:"login",error: e.message ||`Internal Server Error`})
    }
    }catch(e){
        res.render("error/error", {error: e, title: "Error"})
    }

});

//-------------End of Post Login---------------------//


//--------------------Get Logout---------------------/
  router.get('/logout',async (req, res) => {
    req.session.destroy();
    return res.status(200).redirect("/");
    
});
//--------------------End of Get Logout------------------//


module.exports = router;
