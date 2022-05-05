import mongoose, { Schema } from 'mongoose'

const summarizeSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  priority: {
    type: Number
  },
  type: {
    type: String
  },
  year: {
    type: Number
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

summarizeSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      title: this.title,
      type: this.type,
      description: this.description,
      priority: this.priority,
      year: this.year,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Summarize', summarizeSchema)

export const schema = model.schema
export default model
