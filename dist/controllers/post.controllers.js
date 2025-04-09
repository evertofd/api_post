"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.getPost = exports.getPosts = exports.createPost = void 0;
const Post_1 = require("../entities/Post");
/**
* @Everto Farias
* @description: Método que crea un nuevo post con un nombre y descripción
* @param: req (objeto de solicitud con name y description en el body), res (objeto de respuesta)
* @return: JSON con mensaje de éxito y el post creado, o un error si falta información
*/
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(400).json({ error: "Nombre y descripciòn son requeridos." });
        }
        const post = new Post_1.Post();
        post.name = name;
        post.description = description;
        yield post.save();
        res.status(201).json({ message: "Post creado exitosamente", post });
    }
    catch (error) {
        console.error("Error al crear post:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.createPost = createPost;
/**
* @Everto Farias
* @description: Método que obtiene todos los posts.
* @param: req (objeto de solicitud), res (objeto de respuesta)
* @return: JSON con array de todos los posts, o un error si hay problemas en la consulta
*/
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield Post_1.Post.find();
        res.status(200).json(posts);
    }
    catch (error) {
        console.error("Error al obtener los posts:", error);
        res.status(500).json({ error: "Error al obtener los posts" });
    }
});
exports.getPosts = getPosts;
/**
* @Everto Farias
* @description: Método que busca y obtiene un post específico según su ID
* @param: req (objeto de solicitud con id en params), res (objeto de respuesta)
* @return: JSON con los datos del post encontrado, o un error si no existe
*/
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const post = yield Post_1.Post.findOneBy({ id: parseInt(id) });
        res.status(200).json(post);
    }
    catch (error) {
        console.error("Error al obtener el post:", error);
        res.status(500).json({ error: "Error al obtener el post" });
    }
});
exports.getPost = getPost;
/**
 * @Everto Farias
 * @description: Método que actualiza la información de un post existente según su ID
 * @param: req (objeto de solicitud con id en params y name/description en body), res (objeto de respuesta)
 * @return: JSON con mensaje de confirmación y el post modificado, o un error si no se encuentra
 *
*/
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const post = yield Post_1.Post.findOneBy({ id: parseInt(id) });
        if (!post) {
            return res.status(404).json({ error: "Post no encontrado" });
        }
        post.name = name !== null && name !== void 0 ? name : post.name;
        post.description = description !== null && description !== void 0 ? description : post.description;
        yield post.save();
        return res.status(200).json({ message: "Post actualizado", post });
    }
    catch (error) {
        console.error("Error al actualizar post:", error);
        return res.status(500).json({ error: "Error al actualizar el post" });
    }
});
exports.updatePost = updatePost;
/**
* @Everto Farias
* @description: Método que elimina permanentemente un post específico de la base de datos según su ID
* @param: req (objeto de solicitud con id en params), res (objeto de respuesta)
* @return: JSON con mensaje de confirmación y datos del post eliminado, o un error si no existe
*/
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const post = yield Post_1.Post.findOneBy({ id: parseInt(id) });
        const deletedPost = Object.assign({}, post);
        if (!post) {
            return res.status(404).json({ error: "Post no encontrado" });
        }
        yield post.remove();
        return res.status(200).json({ message: "Post eliminado correctamente", post: deletedPost });
    }
    catch (error) {
        console.error("Error al eliminar post:", error);
        return res.status(500).json({ error: "Error al eliminar el post" });
    }
});
exports.deletePost = deletePost;
