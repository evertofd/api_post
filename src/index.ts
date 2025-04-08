import app from "./app"
import { AppDataSource } from "./db"

const main = async () => {
    try {
        await AppDataSource.initialize()
        console.log("Database connected")
        app.listen(process.env.PORT, () => console.log("En el puerto 3000"))
    } catch (error) {
        console.log(error)
    }
}

main()
