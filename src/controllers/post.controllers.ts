import { Request, Response } from "express";
import { Post } from "../entities/Post";

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


export const getPosts = async (req: Request, res: Response) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        console.error("Error al obtener los posts:", error);
        res.status(500).json({ error: "Error al obtener los posts" });
    }
};


export const getPost = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const post = await Post.findOneBy({id:parseInt(id)});
        res.status(200).json(post);
    } catch (error) {
        console.error("Error al obtener el post:", error);
        res.status(500).json({ error: "Error al obtener el post" });
    }
};


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


export const deletePost = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        const post = await Post.findOneBy({ id: parseInt(id) });

        if (!post) {
            return res.status(404).json({ error: "Post no encontrado" });
        }
        await post.remove();
        return res.status(200).json({ message: "Post eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar post:", error);
        return res.status(500).json({ error: "Error al eliminar el post" });
    }
};