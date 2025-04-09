import { Router } from "express";
import { createPost, getPosts, updatePost, deletePost, getPost } from "../controllers/post.controllers";

const router = Router();

/**
* @Everto Farias
* @description: Rutas de los posts
*/
router.post('/posts', createPost);
router.get('/posts', getPosts);
router.get('/posts/:id', getPost);
router.put('/posts/:id', updatePost);
router.delete('/posts/:id', deletePost);

export default router;
