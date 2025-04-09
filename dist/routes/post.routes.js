"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controllers_1 = require("../controllers/post.controllers");
const router = (0, express_1.Router)();
/**
* @Everto Farias
* @description: Rutas de los posts
*/
router.post('/posts', post_controllers_1.createPost);
router.get('/posts', post_controllers_1.getPosts);
router.get('/posts/:id', post_controllers_1.getPost);
router.put('/posts/:id', post_controllers_1.updatePost);
router.delete('/posts/:id', post_controllers_1.deletePost);
exports.default = router;
