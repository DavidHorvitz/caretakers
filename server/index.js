import express from 'express';
import cors from 'cors';
import setup from './db/setup.js'; // Ensure the path is correct
import userRouter from './db/routers/userRouter.js';
import healthRouter from './db/routers/healthRouter.js';
import therapistRouter from './db/routers/therapistRouter.js';


const app = express();
const port = 3050;

app.use(cors());
app.use(express.json());

// Serve the main page with some HTML content
app.get('/', (req, res) => {
  res.send('Server is running on port 3050');
});

app.use('/health', healthRouter);
app.use('/users', userRouter);
app.use('/therapist',therapistRouter);
// Run setup and then start the server
setup()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to complete setup and start the server", err);
  });
