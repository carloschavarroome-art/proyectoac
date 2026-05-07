import { supabase } from "../db/db.js";


// ================= OBTENER TODOS =================
const obtenerTodos = async () => {

    const { data, error } = await supabase
        .from("pedidos")
        .select("*");

    return { data, error };
};


// ================= CREAR PEDIDO =================
export const crearpedido = async (
    descripcion,
    cantidad,
    total,
    usuario_id,
    fecha_pedido
) => {

    const { data, error } = await supabase
        .from("pedidos")
        .insert([{
            descripcion_pedido: descripcion,
            cantidad,
            total,
            usuario_id,
            fecha_pedido
        }])
        .select();

    return { data, error };
};


// ================= ACTUALIZAR PEDIDO =================
export const actualizarpedido = async (
    id,
    datosActualizar
) => {

    const { data, error } = await supabase
        .from("pedidos")
        .update(datosActualizar)
        .eq("id", id)
        .select();

    return { data, error };
};


// ================= ELIMINAR PEDIDO =================
export const eliminarpedido = async (id) => {

    const { data, error } = await supabase
        .from("pedidos")
        .delete()
        .eq("id", id)
        .select();

    return { data, error };
};


// ================= EXPORT MODEL =================
export const pedidoModel = {
    obtenerTodos,
    crearpedido,
    actualizarpedido,
    eliminarpedido
};