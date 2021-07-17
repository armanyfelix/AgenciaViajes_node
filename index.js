import express from 'express';
import db from './server/config/db.js';
import router from './server/routes/index.js';


const app = express();


// Conectar la base datos
db.authenticate()
    .then( () => console.log('Base de datos conectada'))
    .catch( error => console.log(error));

// Puerto y host para la app
const host = process.env.HOST || '0.0.0.0';

// Definir puerto
const port = process.env.PORT || 4000;

// Habilitar pug
app.set('view engine', 'pug');

// Obtener el año actual
app.use( (req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombresitio = "Agencia de Viajes";
    next();
});

// Agregar bodyParser para leer los datos del formulario
app.use(express.urlencoded({extended: true})); //Parse URL-encoded bodies


// Definir la carpet publica
app.use(express.static('public'));


// Agregar Router
app.use('/', router);


app.listen(port, host, () => {
    console.log(`EL servidor esta funcionando en el puerto ${port}`);
})




