import "reflect-metadata"; 
import express from "express";
import morgan from "morgan";
import cors from "cors";
import postRoutes from "./routes/post.routes"

const app = express();
app.use(cors())
app.use(morgan('dev'));
app.use(express.json())
app.use(postRoutes)

export default app;