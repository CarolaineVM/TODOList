import { Router } from "express";
const router = Router();

import { actualizarTarea, crearTarea, eliminarTarea, getAllTareas, getTarea } from "../controllers/index.tareasController.js";

router.get('/', (req, res) => {  res.render('index', {title: "Aplicación TODOList", pagina: "Home"}); })

router.get('/tasks', getAllTareas)
router.get('/task/:id', getTarea)
router.post('/tasks', crearTarea)
router.put('/task/:id', actualizarTarea)
router.delete('/task/:id', eliminarTarea)


export default router