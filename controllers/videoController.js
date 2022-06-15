'use strict'
var XLSX= require('xlsx');
var fs = require('fs');

function videos(req, res){
    fs.readdir('./public/videos/Centro_comercial', function (err, archivos) {
        if (err) {
        onError(err);
        return;
        }
        //console.log(archivos);
       
        res.render('videos', { data: archivos })
    });
  
   
}
function videos_coral(req, res){
  fs.readdir('./public/videos/Coral', function (err, archivos) {
    console.log(err)
      if (err) {
      onError(err);
      return;
      }
      //console.log(archivos);
     
      res.render('videos_coral', { data: archivos })
  });
}


  module.exports={
    videos,
    videos_coral
    
  } 