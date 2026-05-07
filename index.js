import express from "express";
import dotenv from "dotenv";

import { conectarDB } from "./db/db.js";

// ================= RUTAS =================
import userRoutes from "./routes/user.js";
import pedidosRoutes from "./routes/pedido.js";


// configurar dotenv
dotenv.config();


// crear app
const app = express();


// ================= CONECTAR DB =================
conectarDB();


// ================= MIDDLEWARES =================
app.use(express.json());


// ================= RUTA BASE =================
app.get("/", (req, res) => {

    res.send({
        mensaje: "Bienvenido a mi API de Node.js con Express"
    });
});


// ================= SALUDO =================
app.get("/saludo", (req, res) => {

    res.send({
        mensaje: "Hola",
        hora: new Date().toLocaleTimeString()
    });
});


// ================= SOBRE MI =================
app.get("/sobremi", (req, res) => {

    res.send({
        mensaje: "Hola, mi nombre es Carlos Ome",
        hora: new Date().toLocaleTimeString()
    });
});


// ================= USUARIOS =================
app.use("/usuario", userRoutes);


// ================= PEDIDOS =================
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




// ================= SERVER =================
// ================= PUERTO =================
const PORT = 3000;


// ================= INICIAR SERVIDOR =================
app.listen(PORT, () => {

    console.log(
        `Servidor corriendo en http://localhost:${PORT}`
    );
});