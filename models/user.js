import { supabase } from "../db/db.js";

// obtener todos los usuarios
export const UserModel = {
    obtenerTodos: async () => {
        const { data, error } = await supabase
            .from("usuarios")
            .select("*");

        return { data, error };
    }
};

// crear usuario
export const crearUser = async (nombre, email) => {
    const { data, error } = await supabase
        .from("usuarios")
        .insert([{ nombre, email }])
        .select();

    return { data, error };
};

// actualizar usuario
export const actualizarUser = async (id, datosActualizar) => {
    const { data, error } = await supabase
        .from("usuarios")
        .update(datosActualizar)
        .eq("id", id)
        .select();

    return { data, error };
};

// eliminar usuario (SOLO lógica)
export const eliminarUser = async (id) => {
    const { data, error } = await supabase
        .from("usuarios")
        .delete()
        .eq("id", id)
        .select();

    return { data, error };
};