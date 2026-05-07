import express from 'express';

import dotenv from 'dotenv';

import { conectarDB, supabase } from "./db/db.js";
//buscarusuario
import userRoutes from "./routes/user.js";

//buscarpedido
import pedidosRoutes from "./routes/pedido.js";


dotenv.config();

const app = express();

// conectar DB
conectarDB();

// middlewares
app.use(express.json());

// ruta base
app.get('/', (req, res) => {
    res.send({
        mensaje: "Bienvenido a mi API de Node.js con Express"
    });
});

// saludo
app.get("/saludo", (req, res) => {
    res.send({
        mensaje: "Hola",
        hora: new Date().toLocaleTimeString()
    });
});

// sobre mí
app.get("/sobremi", (req, res) => {
    res.send({
        mensaje: "Hola, mi nombre es Carlos Ome",
        hora: new Date().toLocaleTimeString()
    });
});

// ================= USUARIOS =================

//ruta usuario 
app.use("/usuario", userRoutes)
// ================= PEDIDOS =================
//ruta pedido
app.use("/pedidos", pedidosRoutes);

// ================= FACTURAS =================

app.post("/factura", async (req, res) => {
    const { numero_factura, usuario_id, pedido_id, fecha_factura, subtotal, impuesto, total, estado, metodo_pago } = req.body;

    const { data, error } = await supabase
        .from("factura")
        .insert([{
            numero_factura,
            usuario_id,
            pedido_id,
            fecha_factura,
            subtotal,
            impuesto,
            total,
            estado,
            metodo_pago
        }])
        .select();

    if (error) return res.status(500).json({ error });

    res.json({ factura: data[0] });
});

console.log(await response.text());


// ================= SERVER =================

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});