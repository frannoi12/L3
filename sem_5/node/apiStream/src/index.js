import express from "express"
import UserRouter from "./routes/UserRouter.js";
import VideosRouter from "./routes/VideosRouter.js";
import AuthRouter from "./routes/AuthRouter.js";
// import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// import authMiddlware from "./middleware/authMiddleware.js"
import cors from "cors";

dotenv.config();

// const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

// const authMiddlware = (req,res,next) => {
//     // console.log(req.originalUrl);
    
//     if (req.originalUrl != '/auth/login') {
//         // console.log("uuuuuuuuuuuuuuuuuuuuu");
//         const token = req.headers['authorization']?.split(' ')[1]
//         if (!token) return res.status(401).json({ message: 'Accès refusé' });
//         jwt.verify(token, JWT_SECRET, (err, user) => {
//             if (err) return res.status(403).json({ message: 'Token invalide' });
//             req.user = user;
//             next();
//         });
//     }
//     // console.log(token);
//     next()
// }



// console.log(UserRouter);






const app = express()
const port = 3000;
const userRouter = new UserRouter();
const videoRouter = new VideosRouter();
const authRouter = new AuthRouter();


// const whitelist = ['192.168.62.140', '192.168.62.109']


// const corsOptions = {
//     origin: function (origin, callback) {
//       if (whitelist.indexOf(origin) !== -1) {
//         console.log(origin);
        
//         callback(null, true)
//       } else {
//         callback(new Error('Not allowed by CORS'))
//       }
//     }
//   }



// app.get( "/users/",cors(corsOptions), function (req, res, next) {
//     res.json({msg: 'This is CORS-enabled for only example.com.'})
// });


// const corsOptions = {
//     origin: '192.168.62.120',
//     optionsSuccessStatus: 200 
//   }


// app.use(cors(corsOptions), function (req, res, next) {
//     res.json({msg: 'This is CORS-enabled for only example.com.'})
//   });


// app.use(authMiddlware)

app.use(express.json())
app.use('/users',userRouter.getRouter());
app.use('/videos',videoRouter.getRouter());
app.use('/auth',authRouter.getRouter());






app.get('/', (req, res) => {
    // console.log();
    res.send('Hello World!');
});





app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on port ${port}`);
});