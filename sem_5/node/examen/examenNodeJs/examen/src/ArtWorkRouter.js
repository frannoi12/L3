import express from "express";
import ArtWorkController from "./ArtWorkController.js";


export default class ArtWorkRouter {
    router;
    artWorkController;

    constructor() {
        this.router = express.Router();
        this.artWorkController = new ArtWorkController();
        this.initializeRoutes();
    }

    initializeRoutes(){
        this.router.get('/arts', this.artWorkController.getAll.bind(this.artWorkController));
        this.router.get('/arts/:id', this.artWorkController.filter.bind(this.artWorkController));
        this.router.post('/arts/create', this.artWorkController.create.bind(this.artWorkController)); // Utilisez POST pour créer
        this.router.put('/arts/update/:id', this.artWorkController.update.bind(this.artWorkController));
        this.router.delete('/arts/delete/:id', this.artWorkController.delete.bind(this.artWorkController));
    }

    getRouter() {
        return this.router;
    }
}