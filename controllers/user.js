import { UserModel } from "../models/user.js";
import { crearUser } from "../models/user.js";
import { actualizarUser } from "../models/user.js";
import { eliminarUser } from "../models/user.js";

// obtener usuarios
export const usuarios = async (req, res) => {
    const { data, error } = await UserModel.obtenerTodos();

    if (error) {
        return res.status(500).json({ error });
    }

    return res.status(200).json(data);
};

// crear usuario
export const crearUsuario = async (req, res) => {
    const { nombre, email } = req.body;

    if (!nombre || !email) {
        return res.status(400).json({ mensaje: "faltan datos" });
    }

    const { data, error } = await crearUser(nombre, email);

    if (error) {
        return res.status(400).json({
            mensaje: "No se pudo crear el usuario",
            error: error.message
        });
    }

    return res.status(201).json({
        mensaje: "Usuario creado",
        usuario: data[0]
    });
};

// actualizar usuarioooo

export const actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, email, telefono, rol } = req.body;

    //validar id
    if (!id){
        return res.status(400).json({error:"falta el id"});
    }



    //validar que almenos llegue un dato

    if (!nombre && !apellido && !email && !telefono && !rol){
        return res.status(400).json ({error:"no hay datos para actualizar"});
    }

    //construir objeto dinamico

    const datosActualizar={};
    if (nombre) datosActualizar.nombre = nombre;
    if (apellido) datosActualizar.apellido = apellido;
    if (email) datosActualizar.email = email;
    if (telefono) datosActualizar.telefono = telefono;
    if (rol) datosActualizar.rol = rol;

    console.log("datos a actualizar:",datosActualizar);

    const { data, error } = await actualizarUser(id, datosActualizar);

    if (error) {
        return res.status(500).json({ error: error.message });
    }

     // ✅ mensaje personalizado
    res.json({
        mensaje: "Usuario actualizado correctamente",
        data
    });
};

//eliminar usuariooo

export const eliminarUsuario = async (req, res) => {
    const { id } = req.params;


    // validar id
    if (!id) {
        return res.status(400).json({ error: "Falta el id" });
    }

    const { data, error } = await eliminarUser(id);

    if (error) {
        return res.status(500).json({
            mensaje: "Error al eliminar usuario",
            error: error.message
        });
    }

   // si no existe
    if (!data || data.length === 0) {
        return res.status(404).json({
            mensaje: "Usuario no encontrado"
        });
    }

    res.json({
        mensaje: "Usuario eliminado correctamente",
        data
    })};