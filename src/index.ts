import app from "./app"
import { AppDataSource } from "./db/db"
import * as dotenv from "dotenv";

dotenv.config();

const main = async () => {
    try {
        await AppDataSource.initialize()
        console.log("Database Connected")
        app.listen(process.env.PORT, () => console.log(`Corriendo en el puerto ${process.env.PORT}`))
    } catch (error) {
        console.log(error)
    }
}

main()
