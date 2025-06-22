import express from 'express';
import errorHandler from './middleware/errorHandler';
import userRouter from './users/userRouter';
import authMiddleware from './middleware/auth';
import chatRouter from './chat/chatRouter';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//auth middleware test route
app.get('/api/test', authMiddleware, (req, res) => {
    res.status(200).json({
        status: "success",
        message: "test route",
    });
});


//routes
app.use('/api/users', userRouter)
app.use('/api/chat', chatRouter)

// Middleware to handle errors
app.use(errorHandler);

export default app;






