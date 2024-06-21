const express = require('express');
const app = express();
const port = 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Données simulées pour les items et les commandes
let items = [
    { id: '1', name: 'Item 1', description: 'Description for Item 1', price: 100 },
    { id: '2', name: 'Item 2', description: 'Description for Item 2', price: 150 }
];

let orders = [
    { id: '1', items: [items[0]], totalPrice: items[0].price },
    { id: '2', items: [items[1]], totalPrice: items[1].price }
];
/**
 * @swagger
 * tags:
 *   name: Items
 *   description: Operations about items
 *   name: Orders
 *   description: Operations about orders
 */

/**
 * @swagger
 * /api/items:
 *   get:
 *     summary: Retrieve all items
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: A list of items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   price:
 *                     type: number
 */
app.get('/api/items', (req, res) => {
    res.json(items);
});
/**
 * @swagger
 * /api/items/{id}:
 *   get:
 *     summary: Retrieve an item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the item to retrieve
 *     responses:
 *       200:
 *         description: The requested item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *       404:
 *         description: Item not found
 */
app.get('/api/items/:id', (req, res) => {
    const { id } = req.params;
    const item = items.find(item => item.id === id);
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});
/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Retrieve all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: A list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   items:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         description:
 *                           type: string
 *                         price:
 *                           type: number
 *                   totalPrice:
 *                     type: number
 */
app.get('/api/orders', (req, res) => {
    res.json(orders);
});
/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Retrieve an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the order to retrieve
 *     responses:
 *       200:
 *         description: The requested order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       price:
 *                         type: number
 *                 totalPrice:
 *                   type: number
 *       404:
 *         description: Order not found
 */
app.get('/api/orders/:id', (req, res) => {
    const { id } = req.params;
    const order = orders.find(order => order.id === id);
    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ error: 'Order not found' });
    }
});
// Lancer le serveur
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger configuration
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Swagger API REST Cloud Campus',
            version: '1.0.0',
            description: 'Documentation for Cloud Campus API with Swagger',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
                description: 'C Campus Dev server'
            }
        ]
    },
    apis: ['server.js']  // Chemin vers votre fichier de routes
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Utiliser Swagger
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
