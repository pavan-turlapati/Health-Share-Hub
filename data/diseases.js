const ObjectId  = require('mongodb').ObjectId;
const mongoCollections = require('../config/mongoCollections')
const dbConnection = require("../config/mongoConnection");
const diseases = mongoCollections.diseases

function checkSpace (mystr)
{
    let flag=0;
    for (let i =0;i<mystr.length;i++)
    {
        if (mystr.charAt(i)!=' ')
        {
            flag=1;
            break;
        }
    }

    if (flag===0)
    {
        return true
    }
    else
    {
        return false
    }
}


function isValidObjectId(id){
      
    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;        
        return false;
    }
    return false;
}

const createDisease = async function createDisease(diseaseName, description, symptoms,suggestions,medicines,filters)
{
    
    if (diseaseName==null || description==null || suggestions==null|| medicines==null || filters==null || symptoms==null){
       throw `All the input parameter must be provided in the function`;
   }

   if (typeof(diseaseName)!=='string' || typeof(description)==null){
       throw 'The diseaseName and description all should be string. No Other Datatype is allowed!'
   }

   if(checkSpace(diseaseName))
    {
        throw `diseaseName field cannot be just empty spaces`
    }

    if(checkSpace(description))
    {
        throw `description field cannot be just empty spaces`
    }


    if (!Array.isArray(symptoms))
    {
        throw `symptoms is not an array. It should be an array`
    }

    for(i=0;i<symptoms.length;i++)
    {
        if (symptoms[i]==null || symptoms[i]==undefined){
            throw `items in suggestions cannot be null or undefined`;
        }

    
    if (typeof(symptoms[i])!=='string'){
        throw 'The suggestions should be string! No Other Datatype is allowed!'
    }

    if(checkSpace(symptoms[i]))
    {
        throw `Suggestion cannot be just empty spaces`
    }


    symptoms[i] = symptoms[i].trim()

    }

    


    if (!Array.isArray(suggestions))
    {
        throw `suggestions is not an array. It should be an array`
    }

    for(i=0;i<suggestions.length;i++)
    {
        if (suggestions[i]==null || suggestions[i]==undefined){
            throw `items in suggestions cannot be null or undefined`;
        }

    
    if (typeof(suggestions[i])!=='string'){
        throw 'The suggestions should be string! No Other Datatype is allowed!'
    }

    if(checkSpace(suggestions[i]))
    {
        throw `Suggestion cannot be just empty spaces`
    }

    suggestions[i] = suggestions[i].trim()


}

    if (!Array.isArray(medicines))
    {
        throw `medicines is not an array. It should be an array`
    }


    let medicines_len = medicines.length;
    if (medicines_len === 0 ){
        throw 'The medicines array is null. It cannot be null'
    }


    Array.from(medicines).forEach(element=> {

        if (element==null || element==undefined){
            throw `items in Medicines cannot be null or undefined`;
        }

    
    if (typeof(element)!=='string'){
        throw 'The Medicine Names should be string! No Other Datatype is allowed!'
    }

    if(checkSpace(element))
    {
        throw `Medicine Names cannot be just empty spaces`
    }

    element = element.trim();

    });


    if (!Array.isArray(filters))
    {
        throw `filters is not an array. It should be an array`
    }

    let filters_len = filters.length;
    if (filters_len === 0 ){
        throw 'The medicines array is null. It cannot be null'
    }


    Array.from(filters).forEach(element=> {

        if (element==null || element==undefined){
            throw `Items in filter cannot be null`;
        }

    
    if (typeof(element)!=='string'){
        throw 'The filter Names should be string! No Other Datatype is allowed!'
    }

    if(checkSpace(element))
    {
        throw `filter Names cannot be just empty spaces`
    }

    element = element.trim()

    });

    for(i=0;i<filters.length;i++)
    {
        filters[i]=filters[i].toLowerCase();
    }


    diseaseName = diseaseName.trim();
    description = description.trim();


    const diseasesCollection = await diseases();



    const findDisease = await diseasesCollection.find({}).project({diseaseName:1,_id:0}).toArray();
    

    for(let i=0;i<findDisease.length;i++)
    {
        findDisease[i].diseaseName=findDisease[i].diseaseName.toLowerCase();
        if(findDisease[i].diseaseName == diseaseName.toLowerCase())
        {
            throw `Disease Name should be Unique.`
        }
    }


 

    let newdiseases = {
        diseaseName: diseaseName,
        introduction: description,
        symptoms: symptoms,
        suggestions:suggestions,
        medicines:medicines,
        filters:filters

      };



      const insertInfo = await diseasesCollection.insertOne(newdiseases);
      if (insertInfo.insertedCount === 0) throw 'Could not add Disease';
        return newdiseases;


}


const searchDisease = async function searchDisease(searchTerm)
{   
    if(searchTerm==null || searchTerm==undefined)
    {
        throw `Search Term must be provided in the function`;
    }

    if (typeof(searchTerm)!=='string'){
        throw 'The searchTerm be string. No Other Datatype is allowed!'
    }

    if(checkSpace(searchTerm))
    {
        throw `searchTerm field cannot be just empty spaces`
    }

    const diseasesCollection = await diseases();
    searchTerm=searchTerm.toLocaleLowerCase();

    let DiseaseList = await diseasesCollection.find({}).toArray();
    const db = await dbConnection.connectToDb();

    const findInfo = await diseasesCollection.find( { "filters": { $all: [searchTerm] } } ).toArray()
    
    disease_names=[]
    for(i=0;i<findInfo.length;i++)
    {
        
        disease_names[i]=
        {
            diseaseName :findInfo[i].diseaseName,
            id :(findInfo[i]._id).toString()
        }
    }
    
    return disease_names;


}   


const getDiseaseById = async function getDiseaseById(id)
{
    if (arguments.length!=1)
    {
        throw {msg:`The Number of Arguements should be only 1`,err:400};
    }

    if (id == null || id == undefined) {
        throw {msg:`There is no Input in id Parameter. It cannot be null`,err:400};
    }

    if (typeof id !== "string") {
        throw {msg:`The ID Parameter should be string`,err:400};
      }

    if (checkSpace(id)) {
        throw {msg:`id field cannot be just empty spaces`,err:400};
      }

      try {
        var parsedId = ObjectId(id);
      } catch (e) {
        throw {msg:`Input ID should be valid mongodb Object ID`,err:400};
      }

      let diseaseCollection = await diseases();
      let disease = await diseaseCollection.findOne({ _id: parsedId });
      if (disease === null) throw {msg:"No Disease with that id is available",err:404};

      return disease;

}

module.exports={
    createDisease,
    searchDisease,
    getDiseaseById

}
