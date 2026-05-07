import {Router} from 'express';

import { usuarios, crearUsuario, actualizarUsuario, eliminarUsuario} from '../controllers/user.js';


const router = Router();


router.get("/", usuarios);
router.post("/crear", crearUsuario);
router.put("/:id", actualizarUsuario);
router.delete("/:id", eliminarUsuario);


export default router;
