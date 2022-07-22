import  Express  from "express";
import MOvieRouter from "./routes/MovieRoutes";
import bodyParser from "body-parser";
import UploadRouter from "./routes/UploadRoutes";
const app = Express();

app.use(bodyParser.json())

app.use('/upload',Express.static('public/upload'))

app.use('/api/upload',UploadRouter)

app.use('/api/movie',MOvieRouter)


app.listen(5501);


