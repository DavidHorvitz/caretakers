import mongoose from 'mongoose';

const healthCheckSchema = new mongoose.Schema({
  message: String,
});

const HealthCheck = mongoose.model('HealthCheck', healthCheckSchema);

export default HealthCheck;
