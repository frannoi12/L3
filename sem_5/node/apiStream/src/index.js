import express from "express"
import UserRouter from "./routes/UserRouter.js";

// console.log(UserRouter);






const app = express()
const port = 3000;
const userRouter = new UserRouter();


app.use('/users',userRouter.getRouter());





app.get('/', (req, res) => {
    // console.log();
    res.send('Hello World!');
});





app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});