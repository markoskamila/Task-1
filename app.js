const express = require('express');
const {expressjwt:jwt} = require('express-jwt');
const db = require('./pkg/database/index');
//_____________________________________________________________________________


const kurs = require('./handlers/kursHandler');
const akademija = require('./handlers/akademijaHandler');
const auth = require ('./handlers/authHandler');
const test = require ('./handlers/testHandler');
const sitekursevi = require('./handlers/viewHandler');


//_____________________________________________________________________________


const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.init();


app.use(
    jwt({
    algorithms:['HS256'],
    secret: process.env.JWT_SECRET,
    getToken: (req)=>{
      if(req.headers.authorization && req.headers.authorization.split(" ")[0]==='Bearer')
      {
        return req.headers.authorization.split(' ') [1];
  
      }if(req.cookies.jwt){
        return req.cookies.jwt;
  
      }return null; 
    }
  }).unless({
    path:['/signup', '/login']
  })
  );

   
app.post('/signup', auth.signUp);
app.post('/login', auth.logIn);
//__________________________________________
app.get('/test', test.testMessage);

app.get('/welcome',sitekursevi.viewKursevi) // каде што ќе се прикажани во ejs сите курсеви
//__________________________________________
app.post('/kurs', kurs.createKurs); 
app.get('/kurs', kurs.getKurs);
app.get('/kurs/:id',kurs.getAllKursevi);
app.patch('/kurs/:id',kurs.updateKurs );
app.delete('/kurs/:id',kurs.deleteKurs );

app.post('/akademija',akademija.createAkademija);
app.get('/akademija',akademija.getAkademija);
app.get('/akademija/:id',akademija.getAllAkademii);
app.patch('/akademija/:id',akademija.updateAkademija );
app.delete('/akademija/:id',akademija.deleteAkademija);


  
app.listen(process.env.PORT, (err) => {
    if (err) 
      console.error('Could not start service');
      console.log(`Service started successfully on port ${process.env.PORT}...`);
});
  


  
  
  