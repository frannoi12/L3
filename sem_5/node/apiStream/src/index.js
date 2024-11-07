import express from "express"
import UserRouter from "./routes/UserRouter.js";
import VideosRouter from "./routes/VideosRouter.js";
import AuthRouter from "./routes/AuthRouter.js";


// console.log(UserRouter);






const app = express()
const port = 3000;
const userRouter = new UserRouter();
const videoRouter = new VideosRouter();
const authRouter = new AuthRouter();


app.use(express.json())
app.use('/users',userRouter.getRouter());
app.use('/videos',videoRouter.getRouter());
app.use('/auth',authRouter.getRouter());






app.get('/', (req, res) => {
    // console.log();
    res.send('Hello World!');
});





app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});