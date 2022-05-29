'use strict'
var verExcel= require('../controllers/subida');
const express= require('express');
const api= express.Router();
var multiparty = require('connect-multiparty');
var md_upload = multiparty();
//var md_upload = multiparty({ uploadDir: './public/uploads/productos' });
const fs = require('fs');


api.post('/upload',md_upload , (req, res) => {
    let EDFile = req.files.picture.path
    console.log(EDFile)
   var target_path = './public/uploads/productos/' + req.files.picture.name;
   fs.rename(EDFile, target_path, function(err) {
      if (err) throw err;
      
         //if (err) throw err;
         //console.log(EDFile)
    //var target_path = './public/uploads/productos/' + req.files.picture+ '.xls';
    var json_excel=verExcel.verExcel(target_path)
    //console.log(parsear_datos)
    var convertToCSV=verExcel.convertToCSV
    //console.log(convertToCSV(parsear_datos))
    //res.download('sss.csv',convertToCSV(parsear_datos));
    
    fs.writeFile('Filename.csv', convertToCSV(json_excel), (err) => {
        if (err) throw err;
        //console.log('File created');
     });
    
     res.status(200).render('index')
     
   });

})

api.get('/descargar',(req, res)=>{
    res.download('Filename.csv');
})

api.get('/new',(req, res)=>{
    res.redirect('index');
})
module.exports= api
