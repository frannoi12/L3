import express from "express"
import UserRouter from "./routes/UserRouter.js";
import VideosRouter from "./routes/VideosRouter.js";


// console.log(UserRouter);






const app = express()
const port = 3000;
const userRouter = new UserRouter();
const videoRouter = new VideosRouter();


app.use('/users',userRouter.getRouter());
app.use('/videos',videoRouter.getRouter());





app.get('/', (req, res) => {
    // console.log();
    res.send('Hello World!');
});





app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});