import ProductService from "../services/product.service.js";

/**
 * Handles GET /api/v1/products/ 
 */
async function getAllProducts(_, res) {
    try {
        const data = await ProductService.findAll();
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Something went wrong!" });
    }
}

/**
 * Handles GET /api/v1/products/:id
 */
async function getProductById(req, res) {
    try {
        const { id } = req.params;
        const data = await ProductService.findProductById(id);

        if (!data) {
            return res.sendStatus(404);
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Something went wrong!" });
    }
}

/**
 * Handles POST /api/v1/products/
 */
async function createProduct(req, res) {
    try {
        const data = req.body;

        const document = await ProductService.createProduct(data);
        res.status(201).json(document);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Something went wrong!" });
    }
}

/**
 * Handles PUT /api/v1/products/
 */
async function updateProduct(req, res) {
    try {
        const data = req.body;
        const document = await ProductService.updateProduct(data);
        res.status(200).json(document);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Something went wrong!" });
    }
}

/**
 * Handles DELETE /api/v1/products/:id
 */
async function deleteProduct(req, res) {
    try {
        const { id } = req.params;

        await ProductService.deleteProduct(id);
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Something went wrong!" });
    }
}

const ProductController = {
    getAllProducts, getProductById, createProduct, updateProduct, deleteProduct
};

export default ProductController;