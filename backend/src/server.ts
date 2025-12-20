import express, { Express } from 'express';
import { connectDB } from './config/db';
import { corsOptions } from './config/cors';
import { initSocket } from './socket/io';
import dontenv from 'dotenv';
import cors from 'cors';
import productsRoute from './Routes/productsRoute';
import categoriesRoute from './Routes/categoriesRoute';
import AuthRoute from './Routes/AuthRoute';
import ShopRoute from './Routes/ShopRoute';
import OrderRoute from './Routes/OrderRoute';
import ChatRoute from './Routes/ChatRoute';
import http from 'http';


const port = process.env.PORT || 4000; // Socket.io setup -> Only with socket.io

dontenv.config();
connectDB();
const app: Express = express();
app.use(cors(corsOptions));
app.use(express.json());

// rourtes
app.use('/api/auth', AuthRoute)
app.use('/api/products', productsRoute)
app.use('/api/categories', categoriesRoute)
app.use('/api/shop', ShopRoute);
app.use('/api/orders', OrderRoute);
app.use('/api/chats', ChatRoute);

// Socket.io setup -> Only with socket.io
const serverHttp = http.createServer(app)
initSocket(serverHttp)
serverHttp.listen(port, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
export default app;