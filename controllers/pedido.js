import { pedidoModel } from "../models/pedido.js";
import { crearpedido } from "../models/pedido.js";
import { actualizarpedido } from "../models/pedido.js";
import { eliminarpedido } from "../models/pedido.js";


// ================= OBTENER TODOS =================
export const pedidos = async (req, res) => {

    const { data, error } = await pedidoModel.obtenerTodos();

    if (error) {
        return res.status(500).json({
            mensaje: "Error al obtener pedidos",
            error: error.message
        });
    }

    return res.status(200).json(data);
};


// ================= CREAR PEDIDO =================
export const crearnuevopedido = async (req, res) => {

    const {
        descripcion,
        cantidad,
        total,
        usuario_id,
        fecha_pedido
    } = req.body;

    if (
        !descripcion ||
        !cantidad ||
        !total ||
        !usuario_id ||
        !fecha_pedido
    ) {

        return res.status(400).json({
            mensaje: "Faltan datos para crear el pedido"
        });
    }

    const { data, error } = await crearpedido(
        descripcion,
        cantidad,
        total,
        usuario_id,
        fecha_pedido
    );

    if (error) {

        return res.status(400).json({
            mensaje: "No se pudo crear el pedido",
            error: error.message
        });
    }

    return res.status(201).json({
        mensaje: "Pedido creado correctamente",
        pedido: data[0]
    });
};


// ================= ACTUALIZAR PEDIDO =================
export const actualizarpedidos = async (req, res) => {

    const { id } = req.params;

    const {
        descripcion,
        cantidad,
        total,
        usuario_id,
        fecha_pedido
    } = req.body;


    // validar id
    if (!id) {

        return res.status(400).json({
            error: "Falta el id"
        });
    }


    // validar datos
    if (
        !descripcion &&
        !cantidad &&
        !total &&
        !usuario_id &&
        !fecha_pedido
    ) {

        return res.status(400).json({
            error: "No hay datos para actualizar"
        });
    }


    // objeto dinámico
    const datosActualizar = {};

    if (descripcion) datosActualizar.descripcion = descripcion;
    if (cantidad) datosActualizar.cantidad = cantidad;
    if (total) datosActualizar.total = total;
    if (usuario_id) datosActualizar.usuario_id = usuario_id;
    if (fecha_pedido) datosActualizar.fecha_pedido = fecha_pedido;


    console.log("Datos a actualizar:", datosActualizar);


    const { data, error } = await actualizarpedido(
        id,
        datosActualizar
    );


    if (error) {

        return res.status(500).json({
            error: error.message
        });
    }


    return res.status(200).json({
        mensaje: "Pedido actualizado correctamente",
        data
    });
};


// ================= ELIMINAR PEDIDO =================
export const eliminarpedidos = async (req, res) => {

    const { id } = req.params;

    if (!id) {

        return res.status(400).json({
            mensaje: "Falta el id del pedido"
        });
    }

    const { data, error } = await eliminarpedido(id);

    if (error) {

        return res.status(400).json({
            mensaje: "No se pudo eliminar el pedido",
            error: error.message
        });
    }

    return res.status(200).json({
        mensaje: "Pedido eliminado correctamente",
        pedido: data[0]
    });
};