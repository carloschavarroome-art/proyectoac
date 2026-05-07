import { supabase } from "../db/db.js";

export const pedidoModel = {
    obtenerTodos: async () => {
        const { data, error } = await supabase
            .from("pedidos")
            .select("*");

        return { data, error };
    },

    crearpedido: async (descripcion, cantidad, total, usuario_id, fecha_pedido) => {
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
    },

    actualizarpedido: async (id, datosActualizar) => {
        const { data, error } = await supabase
            .from("pedidos")
            .update(datosActualizar)
            .eq("id", id)
            .select();

        return { data, error };
    },

    eliminarpedido: async (id) => {
        const { data, error } = await supabase
            .from("pedidos")
            .delete()
            .eq("id", id)
            .select();

        return { data, error };
    }
};