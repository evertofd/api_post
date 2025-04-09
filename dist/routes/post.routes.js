"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controllers_1 = require("../controllers/post.controllers");
const router = (0, express_1.Router)();
/**
* @Everto Farias
* @description: Rutas de los posts
*/
/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Crear un nuevo post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post creado con éxito
 *       400:
 *         description: Faltan campos requeridos
 *       500:
 *         description: Error en el servidor
 */
router.post('/posts', post_controllers_1.createPost);
/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Obtener todos los posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Lista de posts
 *       500:
 *         description: Error al obtener los posts
 */
router.get('/posts', post_controllers_1.getPosts);
/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Obtener un post por ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del post
 *     responses:
 *       200:
 *         description: Post encontrado
 *       404:
 *         description: Post no encontrado
 */
router.get('/posts/:id', post_controllers_1.getPost);
/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Actualizar un post por ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post actualizado
 *       404:
 *         description: Post no encontrado
 *       500:
 *         description: Error al actualizar el post
 */
router.put('/posts/:id', post_controllers_1.updatePost);
/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Eliminar un post por ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del post
 *     responses:
 *       200:
 *         description: Post eliminado
 *       404:
 *         description: Post no encontrado
 *       500:
 *         description: Error al eliminar el post
 */
router.delete('/posts/:id', post_controllers_1.deletePost);
exports.default = router;
