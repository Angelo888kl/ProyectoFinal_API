import express from 'express';
import morgan from 'morgan';
import routes from './routes/index.js';
import { getConnection, port } from './configurations/index.js';
import cors from 'cors';


//USo de la instancia experess
const app = express();

//confi de puerto 
app.set('port', port)

app.use(cors()); // Habilita CORS para todas las rutas

//Uso de las librerias 
app.use(morgan("dev"));

//middlewares, es un interceptor
app.use(express.json());//Body recuest
app.use(express.urlencoded({extended: false}));// anula la codificacion

//Uso de archivos rutas 
app.use("/api", routes);
app.get("/", (req, res) => {
    return res.status(200).send("Consulta realizada");
})
//inicio del server
app.listen(app.get('port'), () => {
    console.log("Api iniciada");
}) 