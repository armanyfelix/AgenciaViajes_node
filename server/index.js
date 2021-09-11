import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path'
import db from './config/db.js';
import router from './routes/index.js';
import dotenv from "dotenv";

dotenv.config({path: 'variables.env'});

// Conectar la base datos
db.authenticate()
    .then( () => console.log('Base de datos conectada'))
    .catch( error => console.log(error));

const app = express();

// Habilitar pug
app.set('view engine', 'pug');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.set('views', path.join(__dirname, 'views'));

// Cargando la carpeta public
app.use(express.static('public'));


// Obtener el año actual
app.use( (req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombresitio = "Agencia de Viajes";
    res.locals.ruta = req.path;
    return next();
});

// Agregar bodyParser para leer los datos del formulario
app.use(express.urlencoded({extended: true})); //Parse URL-encoded bodies


// Agregar Router
app.use('/', router);

// Puerto y host para la app
const host = process.env.HOST || '0.0.0.0';

// Definir puerto
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
    console.log(`EL servidor esta funcionando en el puerto ${port}`);
})







