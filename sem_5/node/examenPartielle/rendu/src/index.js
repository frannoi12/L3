import express from "express"
import UserRouter from "./routes/UserRoute.js";
import TasksRouter from "./routes/TaskRoute.js";
import AuthRouter from "./routes/AuthRouter.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// import authMiddlware from "./middleware/authMiddleware.js"

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

const authMiddlware = (req,res,next) => {
    // console.log(req.originalUrl);
    
    if (req.originalUrl != '/auth/login') {
        // console.log("uuuuuuuuuuuuuuuuuuuuu");
        const token = req.headers['authorization']?.split(' ')[1]
        if (!token) return res.status(401).json({ message: 'Accès refusé' });
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) return res.status(403).json({ message: 'Token invalide' });
            req.user = user;
            next();
        });
    }
    // console.log(token);
    next()
}



// console.log(UserRouter);






const app = express()
const port = 3000;
const userRouter = new UserRouter();
const videoRouter = new TasksRouter();
const authRouter = new AuthRouter();


app.use(authMiddlware)

app.use(express.json())
app.use('/users',userRouter.getRouter());
app.use('/tasks',videoRouter.getRouter());
app.use('/auth',authRouter.getRouter());






app.get('/', (req, res) => {
    // console.log();
    res.send('Hello World!');
});





app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on port ${port}`);
});