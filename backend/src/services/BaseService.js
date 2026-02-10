import mongoose from 'mongoose';

export class BaseService {
  constructor(model) {
    this.model = model;
  }

  async findById(id, populate = []) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid ID format');
    }
    
    let query = this.model.findById(id);
    if (populate.length > 0) {
      query = query.populate(populate);
    }
    
    return await query.exec();
  }

  async findOne(filter = {}, populate = []) {
    let query = this.model.findOne(filter);
    if (populate.length > 0) {
      query = query.populate(populate);
    }
    
    return await query.exec();
  }

  async findMany(filter = {}, populate = [], options = {}) {
    let query = this.model.find(filter);
    
    if (populate.length > 0) {
      query = query.populate(populate);
    }
    
    if (options.sort) {
      query = query.sort(options.sort);
    }
    
    if (options.limit) {
      query = query.limit(options.limit);
    }
    
    if (options.skip) {
      query = query.skip(options.skip);
    }
    
    return await query.exec();
  }

  async create(data) {
    try {
      const instance = new this.model(data);
      return await instance.save();
    } catch (error) {
      if (error.name === 'ValidationError') {
        const validationErrors = Object.values(error.errors).map(err => err.message);
        throw new Error(`Validation failed: ${validationErrors.join(', ')}`);
      }
      throw error;
    }
  }

  async update(id, data) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid ID format');
    }

    try {
      return await this.model.findByIdAndUpdate(
        id,
        data,
        { new: true, runValidators: true }
      ).exec();
    } catch (error) {
      if (error.name === 'ValidationError') {
        const validationErrors = Object.values(error.errors).map(err => err.message);
        throw new Error(`Validation failed: ${validationErrors.join(', ')}`);
      }
      throw error;
    }
  }

  async delete(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid ID format');
    }

    return await this.model.findByIdAndDelete(id).exec();
  }

  async count(filter = {}) {
    return await this.model.countDocuments(filter).exec();
  }
}