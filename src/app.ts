import "reflect-metadata"; 
import express from "express";
import morgan from "morgan";
import cors from "cors";
import postRoutes from "./routes/post.routes"

const app = express();
app.use(morgan('dev'));
app.use(express.json())
app.use(postRoutes)
app.use(cors())

export default app;