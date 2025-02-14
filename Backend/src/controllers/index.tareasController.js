import { join } from "path";
import { readFileSync, writeFileSync } from "fs";

const __dirname = join(process.cwd(), '/src/database');

export const getAllTareas = (req, res) => {
    try{
        const database = JSON.parse(readFileSync(join(__dirname, "/data.json"), "utf-8"));
        res.status(200).json({"status": 200, data: database.tareas})
    } catch(error) {
        res.status(500).json({"status": 500, "msg": error.message})
    }
}

export const getTarea = (req, res) => {
    try{
        const database = JSON.parse(readFileSync(join(__dirname, "/data.json"), "utf-8"));
        const { id } = req.params;

        const tarea = database.tareas.find( element => element.id === parseInt(id))

        if(!tarea) return res.status(404).json({"status": 404, "msg": `La tarea no EXISTE`})

        res.status(200).json({"status": 200, data: tarea});

    } catch(error){
        res.status(500).json({"status": 500, "msg": error.message})
    }
}

export const crearTarea = (req, res) => {
    try{
        const database = JSON.parse(readFileSync(join(__dirname, "/data.json"), "utf-8"));
        //console.log(req)
        const { titulo, descripcion, estado } = req.body;

        if( !titulo || !descripcion || !estado ) return res.status(400).json({"status": 400, "msg": "Campos requeridos"})

        const tareasLength = database.tareas.length;
 
        database.tareas.push({ id: Math.floor(Math.random() * 999), titulo, descripcion, estado });

        writeFileSync(join(__dirname, "data.json"), JSON.stringify(database), "utf-8")

        res.status(200).json({"status": 200, "data": `La tarea se a creado correctamente: ${titulo}`})

    } catch(error) {
        res.status(500).json({"status": 500, "msg": error.message})
    }
}

export const actualizarTarea = (req, res) => {
    try{
        const database = JSON.parse(readFileSync(join(__dirname, "/data.json"), "utf-8"));
        const { titulo, descripcion, estado } = req.body;
        const { id } = req.params;

        const usuario = database.tareas.find( element => element.id === parseInt(id))
        if(!usuario) return res.status(404).json({"status": 404, "msg": `La tarea con el ${id} no existe`})

        const actualizaData = database.tareas.map( element => element.id === parseInt(id) ? {...element, titulo, descripcion, estado} : element);
        writeFileSync(join(__dirname, "/data.json"), JSON.stringify({tareas: actualizaData}), "utf-8");
        res.status(200).json({
            "status": 200, 
                data: {
                id: parseInt(id),
                titulo,
            }
        })

    } catch(error) {
        res.status(500).json({"status": 500, "msg": error.message})
    }
}

export const eliminarTarea = (req, res) => {
    try{

        const database = JSON.parse(readFileSync(join(__dirname, "/data.json"), "utf-8"));
        const { id } = req.params;

        const buscarTarea = database.tareas.find(element => element.id === parseInt(id));
        if(!buscarTarea) return res.status(404).json({"status": 404, "msg": `La tarea no Existe`})

        const filterData = database.tareas.filter(element => element.id !== parseInt(id));
        writeFileSync(join(__dirname, "/data.json"), JSON.stringify({tareas: filterData}), "utf-8");

        res.status(200).json({"status": 200, "msg": `La tarea se elimino correctamente`});

    } catch(error) {
        res.status(500).json({"status": 500, "msg": error.message})
    }
}