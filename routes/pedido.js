import { actualizarpedidos, Routes } from "../controllers/pedido.js";
import {
  pedidoModel,
  crearnuevopedido,
  actualizarpedido,
  eliminarpedido
} from "../controllers/pedido.js";

const router = Routes();

router.get("/", pedidoModel);
router.post("/", crearnuevopedido);
router.put("/:id", actualizarpedidos);
router.delete("/:id", eliminarpedidos);


export default router;