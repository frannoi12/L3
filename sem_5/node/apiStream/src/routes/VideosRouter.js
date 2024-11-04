import express from "express";
import VideoController from "../controllers/VideoController.js";

export default class VideosRouter {

    router;
    videoController;
    
    constructor() {
        this.router = express.Router();
        this.videoController = new VideoController();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get('/', this.videoController.getVideos.bind(this.videoController));
        this.router.get('/:id', this.videoController.getVideo.bind(this.videoController));
        this.router.post('/create', this.videoController.createVideo.bind(this.videoController));
        this.router.put('/update/:id', this.videoController.updateVideo.bind(this.videoController));
        this.router.delete('/delete/:id', this.videoController.deleteVideo.bind(this.videoController));
    }

    getRouter() {
        return this.router;
    }
}



// import e from "express";
// import VideoController from "../controllers/VideoController.js"


// export default class VideosRouter{

//     router;
//     videoController;

//     constructor() {
//         this.router = e.Router();
//         this.videoController = new VideoController();
//         this.initializeRoutes();
//     }

//     initializeRoutes() {
//         this.router.get('/', this.videoController.getVideos.bind(this.videoController));
//     }

//     getRouter() {
//         return this.router;
//     }
// }