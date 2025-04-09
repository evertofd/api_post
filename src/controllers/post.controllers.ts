import { Request, Response } from "express";
import { Post } from "../entities/Post";

/**
* @Everto Farias
* @description: Método que crea un nuevo post con un nombre y descripción
* @param: req (objeto de solicitud con name y description en el body), res (objeto de respuesta)
* @return: JSON con mensaje de éxito y el post creado, o un error si falta información
*/

export const createPost = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(400).json({ error: "Nombre y descripciòn son requeridos." });
        }

        const post = new Post();
        post.name = name;
        post.description = description;
        await post.save();

        res.status(201).json({ message: "Post creado exitosamente", post });
    } catch (error) {
        console.error("Error al crear post:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

/**
* @Everto Farias
* @description: Método que obtiene todos los posts.
* @param: req (objeto de solicitud), res (objeto de respuesta)
* @return: JSON con array de todos los posts, o un error si hay problemas en la consulta
*/

export const getPosts = async (req: Request, res: Response) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        console.error("Error al obtener los posts:", error);
        res.status(500).json({ error: "Error al obtener los posts" });
    }
};

/**
* @Everto Farias
* @description: Método que busca y obtiene un post específico según su ID
* @param: req (objeto de solicitud con id en params), res (objeto de respuesta)
* @return: JSON con los datos del post encontrado, o un error si no existe
*/

export const getPost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const post = await Post.findOneBy({ id: parseInt(id) });
        res.status(200).json(post);
    } catch (error) {
        console.error("Error al obtener el post:", error);
        res.status(500).json({ error: "Error al obtener el post" });
    }
};

/**
 * @Everto Farias
 * @description: Método que actualiza la información de un post existente según su ID
 * @param: req (objeto de solicitud con id en params y name/description en body), res (objeto de respuesta)
 * @return: JSON con mensaje de confirmación y el post modificado, o un error si no se encuentra
 *
*/

export const updatePost = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const post = await Post.findOneBy({ id: parseInt(id) });

        if (!post) {
            return res.status(404).json({ error: "Post no encontrado" });
        }

        post.name = name ?? post.name;
        post.description = description ?? post.description;

        await post.save();

        return res.status(200).json({ message: "Post actualizado", post });
    } catch (error) {
        console.error("Error al actualizar post:", error);
        return res.status(500).json({ error: "Error al actualizar el post" });
    }
};

/**
* @Everto Farias
* @description: Método que elimina permanentemente un post específico de la base de datos según su ID
* @param: req (objeto de solicitud con id en params), res (objeto de respuesta)
* @return: JSON con mensaje de confirmación y datos del post eliminado, o un error si no existe
*/

export const deletePost = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const post = await Post.findOneBy({ id: parseInt(id) });
        const deletedPost = { ...post };
        if (!post) {
            return res.status(404).json({ error: "Post no encontrado" });
        }
        await post.remove();
        return res.status(200).json({ message: "Post eliminado correctamente", post: deletedPost });
    } catch (error) {
        console.error("Error al eliminar post:", error);
        return res.status(500).json({ error: "Error al eliminar el post" });
    }
};