const express = require('express');
const path = require('path');
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
 * @api {get} /api/items Request all items
 * @apiName GetItems
 * @apiGroup Items
 *
 * @apiSuccess {String} id Item ID.
 * @apiSuccess {String} name Item name.
 * @apiSuccess {String} description Item description.
 * @apiSuccess {Number} price Item price.
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * [
 *   {
 *     "id": "1",
 *     "name": "Item 1",
 *     "description": "Description for Item 1",
 *     "price": 100
 *   },
 *   {
 *     "id": "2",
 *     "name": "Item 2",
 *     "description": "Description for Item 2",
 *     "price": 150
 *   }
 * ]
 */
app.get('/api/items', (req, res) => {
    res.json(items);
});

/**
 * @api {get} /api/items/:id Request an item by ID
 * @apiName GetItemById
 * @apiGroup Items
 *
 * @apiParam {String} id Item ID.
 *
 * @apiSuccess {String} id Item ID.
 * @apiSuccess {String} name Item name.
 * @apiSuccess {String} description Item description.
 * @apiSuccess {Number} price Item price.
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "id": "1",
 *   "name": "Item 1",
 *   "description": "Description for Item 1",
 *   "price": 100
 * }
 *
 * @apiError ItemNotFound The item was not found.
 *
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   "error": "Item not found"
 * }
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
 * @api {post} /api/items Create a new item
 * @apiName CreateItem
 * @apiGroup Items
 *
 * @apiBody {String} name Item name.
 * @apiBody {String} description Item description.
 * @apiBody {Number} price Item price.
 *
 * @apiSuccess {String} id Item ID.
 * @apiSuccess {String} name Item name.
 * @apiSuccess {String} description Item description.
 * @apiSuccess {Number} price Item price.
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 201 Created
 * {
 *   "id": "3",
 *   "name": "New Item",
 *   "description": "Description for New Item",
 *   "price": 200
 * }
 */
app.post('/api/items', (req, res) => {
    const { name, description, price } = req.body;
    const newItem = { id: (items.length + 1).toString(), name, description, price };
    items.push(newItem);
    res.status(201).json(newItem);
});

/**
 * @api {put} /api/items/:id Update an item by ID
 * @apiName UpdateItem
 * @apiGroup Items
 *
 * @apiParam {String} id Item ID.
 * @apiBody {String} name Item name.
 * @apiBody {String} description Item description.
 * @apiBody {Number} price Item price.
 *
 * @apiSuccess {String} id Item ID.
 * @apiSuccess {String} name Item name.
 * @apiSuccess {String} description Item description.
 * @apiSuccess {Number} price Item price.
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "id": "1",
 *   "name": "Updated Item",
 *   "description": "Updated Description",
 *   "price": 120
 * }
 *
 * @apiError ItemNotFound The item was not found.
 *
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   "error": "Item not found"
 * }
 */
app.put('/api/items/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const itemIndex = items.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
        items[itemIndex] = { id, name, description, price };
        res.json(items[itemIndex]);
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

/**
 * @api {delete} /api/items/:id Delete an item by ID
 * @apiName DeleteItem
 * @apiGroup Items
 *
 * @apiParam {String} id Item ID.
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "message": "Item deleted"
 * }
 *
 * @apiError ItemNotFound The item was not found.
 *
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   "error": "Item not found"
 * }
 */
app.delete('/api/items/:id', (req, res) => {
    const { id } = req.params;
    const initialLength = items.length;
    items = items.filter(item => item.id !== id);
    if (items.length < initialLength) {
        res.json({ message: 'Item deleted' });
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

/**
 * @api {get} /api/orders Request all orders
 * @apiName GetOrders
 * @apiGroup Orders
 *
 * @apiSuccess {Object[]} orders List of orders.
 * @apiSuccess {String} orders.id Order ID.
 * @apiSuccess {Object[]} orders.items List of items in the order.
 * @apiSuccess {String} orders.items.id Item ID.
 * @apiSuccess {String} orders.items.name Item name.
 * @apiSuccess {String} orders.items.description Item description.
 * @apiSuccess {Number} orders.items.price Item price.
 * @apiSuccess {Number} orders.totalPrice Total price of the order.
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * [
 *   {
 *     "id": "1",
 *     "items": [
 *       {
 *         "id": "1",
 *         "name": "Item 1",
 *         "description": "Description for Item 1",
 *         "price": 100
 *       }
 *     ],
 *     "totalPrice": 100
 *   },
 *   {
 *     "id": "2",
 *     "items": [
 *       {
 *         "id": "2",
 *         "name": "Item 2",
 *         "description": "Description for Item 2",
 *         "price": 150
 *       }
 *     ],
 *     "totalPrice": 150
 *   }
 * ]
 */
app.get('/api/orders', (req, res) => {
    res.json(orders);
});

/**
 * @api {get} /api/orders/:id Request an order by ID
 * @apiName GetOrderById
 * @apiGroup Orders
 *
 * @apiParam {String} id Order ID.
 *
 * @apiSuccess {String} id Order ID.
 * @apiSuccess {Object[]} items List of items in the order.
 * @apiSuccess {String} items.id Item ID.
 * @apiSuccess {String} items.name Item name.
 * @apiSuccess {String} items.description Item description.
 * @apiSuccess {Number} items.price Item price.
 * @apiSuccess {Number} totalPrice Total price of the order.
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "id": "1",
 *   "items": [
 *     {
 *       "id": "1",
 *       "name": "Item 1",
 *       "description": "Description for Item 1",
 *       "price": 100
 *     }
 *   ],
 *   "totalPrice": 100
 * }
 *
 * @apiError OrderNotFound The order was not found.
 *
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   "error": "Order not found"
 * }
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

// Route pour servir le fichier index.html de la documentation apidoc
app.use('/apidoc', express.static(path.join(__dirname, 'apidoc')));

// Lancer le serveur
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
