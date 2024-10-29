import e from "express";
import VideoController from "../controllers/VideoController.js"


export default class VideosRouter{

    router;
    videoController;

    constructor() {
        this.router = e.Router();
        this.videoController = new VideoController();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get('/', this.videoController.getVideos.bind(this.videoController));
    }

    getRouter() {
        return this.router;
    }
}