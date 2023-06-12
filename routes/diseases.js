const express = require('express');
const data = require('../data');
const diseaseData = data.diseases;
const mongoCollections = require('../config/mongoCollections')
const diseaseCollection = mongoCollections.diseases;
const ObjectID  = require('mongodb').ObjectId;
const { searchUser } = require('../data/users');
const router = express.Router();
const xss = require('xss');



router.get('/:id', async (req, res) => {

    let serchTerm = xss(req.params.id)
    if(serchTerm=='diseaseID'){
      res.status(403).render('error/error',{ error: 'Page Not Found',title:"Error"});
      return;
    }
    if(!serchTerm)
    {
      return res.status(400).json('Search Term cannot be Empty, null or undefined');
    }
    if(typeof serchTerm!="string")
    {
      return res.status(400).json('Search Term Should be of String Format');
    }
    let st=serchTerm.trim()
    if(st.length==0)
    {
      return res.status(400).json('Search Term cannot be Empty, null or undefined');
    }

    try{
    const disease_list = await diseaseData.searchDisease(serchTerm)
    return res.json(disease_list);
    }catch(e)
    {
      console.log(e)
    }
})

router.get('/diseaseID/:id', async (req, res) => {
    let id = xss(req.params.id)

    if(!id)
    {
      res.status(403).render('error/error',{ error:'Page Not Found',title:"Error"});
      return;
    }
    if(typeof id!="string")
    {
      res.status(400).render('error/error',{ error:'Id Should be String',title:"Error"});
      return;
    }
    let st=id.trim()
    if(st.length==0)
    {
      res.status(400).render('error/error',{ error:'Search Term cannot be Empty, null or undefined',title:"Error"});
      return;
    }

    try {

        var disease_list = await diseaseData.getDiseaseById(id)
  
      } catch (e) {
          res.status(e.err || 500).render('error/error',{ error: e.msg || 'Internal Server Error',title:"Error"});
        return;
      }

      const {diseaseName,introduction,symptoms,suggestions,medicines} = disease_list;

        if(req.session.user)
        {
          res.render('disease/disease', {diseaseName:diseaseName,description:introduction,symptoms:symptoms,suggestions:suggestions,medicines:medicines,title:diseaseName,name:req.session.user,diseaseId:id});
          return;
        }
        else{
       res.render('disease/disease', {diseaseName:diseaseName,description:introduction,symptoms:symptoms,suggestions:suggestions,medicines:medicines,title:diseaseName,diseaseId:id});
        return;
        }
      })

module.exports = router;