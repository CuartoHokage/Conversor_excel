'use strict'
var verExcel= require('../controllers/subida');
const express= require('express');
const api= express.Router();
var multiparty = require('connect-multiparty');
var md_upload = multiparty();
//var md_upload = multiparty({ uploadDir: './public/uploads/productos' });
const fs = require('fs');

//subidas
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
//subida de videos
api.post('/upload_video',md_upload , (req, res) => {
    let EDFile = req.files.picture.path
    console.log(EDFile)
   var target_path = './public/video/' + 'video.mp4';
   fs.rename(EDFile, target_path, function(err) {
      if (err) throw err;   
    /*   
    fs.writeFile('video.mp4', EDFile, (err) => {
        if (err) throw err;
        //console.log('File created');
     });
    */
     res.status(200).render('index')
     
   });

})
//vistas

api.get('/descarga_apk_bodega', (req, res)=>{
	res.render('apk')
})

api.get('/stream', (req, res)=>{
	res.render('video')
})
api.get('/subir_video', (req, res)=>{
	res.render('subidavideo')
})
//descargas
api.get('/descargar',(req, res)=>{
    res.download('Filename.csv');
})

api.get('/descargarapk',(req, res)=>{
    res.download('InventarioCorales.apk');
})

api.get('/new',(req, res)=>{
    res.redirect('index');
})
module.exports= api