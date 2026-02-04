import { Router } from "express";
import ProductController from "../controllers/product.controller.js";

const router = Router();

router.route("/")
    .get((req, res) => {
        ProductController.getAllProducts(req, res);
    })
    .post((req, res) => {
        ProductController.createProduct(req, res);
    })
    .put((req, res) => {
        ProductController.updateProduct(req, res);
    })

router.route("/:id")
    .get((req, res) => {
        ProductController.getProductById(req, res);
    })
    .delete((req, res) => {
        ProductController.deleteProduct(req, res);
    });


export default router;