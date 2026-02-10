import { errorHandler } from '../utils/errorHandler.js';

export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: 'Validation failed',
        details: error.details.map(detail => detail.message)
      });
    }
    next();
  };
};

export const rateLimiter = (windowMs, max) => {
  const requests = new Map();
  
  return (req, res, next) => {
    const key = req.ip;
    const now = Date.now();
    const windowStart = now - windowMs;
    
    if (!requests.has(key)) {
      requests.set(key, []);
    }
    
    const userRequests = requests.get(key).filter(time => time > windowStart);
    
    if (userRequests.length >= max) {
      return res.status(429).json({
        message: 'Too many requests, please try again later'
      });
    }
    
    userRequests.push(now);
    requests.set(key, userRequests);
    
    next();
  };
};