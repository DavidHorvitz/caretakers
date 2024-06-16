import express from 'express';
import HealthCheck from '../models/HealthCheck.js';


const healthRouter = express.Router();

// מסלול GET לבדיקת בריאות השרת
healthRouter.get('/', async (req, res) => {
    try {
        // יצירת מסמך בדיקת בריאות
        const testDoc = new HealthCheck({ message: 'Health check' });
        // שמירה של המסמך
        await testDoc.save();
        // מחיקת המסמך
        await HealthCheck.deleteOne({ _id: testDoc._id });

        // החזרת תשובה חיובית ללקוח
        res.status(200).send('Server is healthy');
    } catch (err) {
        console.error('Server health check failed', err);
        // החזרת תשובת שגיאה ללקוח
        res.status(500).send('Server is unhealthy');
    }
});

export default healthRouter;
