import express from "express";

import {
    pedidos,
    crearnuevopedido,
    actualizarpedidos,
    eliminarpedidos
} from "../controllers/pedido.js";


const router = express.Router();


// ================= OBTENER TODOS =================
router.get("/", pedidos);


// ================= CREAR PEDIDO =================
router.post("/", crearnuevopedido);


// ================= ACTUALIZAR PEDIDO =================
router.put("/:id", actualizarpedidos);


// ================= ELIMINAR PEDIDO =================
router.delete("/:id", eliminarpedidos);


export default router;