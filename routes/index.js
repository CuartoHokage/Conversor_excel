'use strict'
var verExcel= require('../controllers/subida');
var video= require('../controllers/videoController');
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
   //Separa nombre y extension del archivo subido en un array 
   var nombre_archivo=req.files.picture.name.split('\.')
   var file_ext= nombre_archivo[1]
   //si no es XLS no dejara subir archivo
   if(file_ext== 'xls' ){
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
   }else{
    return res.status(200).send({
        status: 'error',
        message: 'Extension de archivo invalida',
        file:target_path
    });
   }
  
})
//subida de videos
api.post('/upload_video',md_upload , (req, res) => {
    let EDFile = req.files.picture.path
    let id_video= req.body.seleccion;
    let zona= req.body.zona;
    console.log(EDFile)
   var target_path = './public/videos/'+zona+'/' + ''+id_video+'.mp4';
   fs.rename(EDFile, target_path, function(err) {
      if (err) throw err;   
    /*   
    fs.writeFile('video.mp4', EDFile, (err) => {
        if (err) throw err;
        //console.log('File created');
     });
    */
     res.status(200).render('subidavideo')
     
   });

})

api.post('/apk_verificador',md_upload , (req, res) => {
    let EDFile = req.files.picture.path
    console.log(EDFile)
   var target_path = './public/uploads/apks/' + 'verificador.apk';
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
api.post('/apk_gerencia',md_upload , (req, res) => {
    let EDFile = req.files.picture.path
    console.log(EDFile)
   var target_path = './public/uploads/apks/' + 'apk_gerencia.apk';
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
api.post('/rompefilas',md_upload , (req, res) => {
    let EDFile = req.files.picture.path
    console.log(EDFile)
   var target_path = './public/uploads/apks/' + 'rompefilas.apk';
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

api.post('/ingreso_factura',md_upload , (req, res) => {
    let EDFile = req.files.picture.path
    console.log(EDFile)
   var target_path = './public/uploads/apks/' + 'ingreso_facturas.apk';
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

api.get('/videos_coral', video.videos_coral, (req, res)=>{
	res.render('video_coral', )
})

api.get('/videos', video.videos, (req, res)=>{
	res.render('videos', )
})




api.get('/subir_video', (req, res)=>{
	res.render('subidavideo')
})
api.get('/subir_apk', (req, res)=>{
	res.render('subir_apks')
})

//descargas
api.get('/descargar',(req, res)=>{
    res.download('Filename.csv');
})

api.get('/descargarapk',(req, res)=>{
    res.download('./public/uploads/apks/ingreso_facturas.apk');
})

api.get('/descargarapk2',(req, res)=>{
    res.download('./public/uploads/apks/verificador.apk');
})

api.get('/descargarapk3',(req, res)=>{
    res.download('./public/uploads/apks/apk_gerencia.apk');
})

api.get('/descargarapk4',(req, res)=>{
    res.download('./public/uploads/apks/rompefilas.apk');
})

api.get('/descarga_video',(req, res)=>{
    res.download('./public/videos/Coral/1.mp4');
})

api.get('/new',(req, res)=>{
    res.redirect('index');
})
module.exports= api
