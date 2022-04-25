import mongoose, { Schema } from 'mongoose'

const assessmentstandardsSchema = new Schema({
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
  },
  assessments: [{
    type: Schema.Types.ObjectId,
    ref: "Assessment"
  }]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

assessmentstandardsSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      title: this.title,
      description: this.description,
      priority: this.priority,
      type: this.type,
      year: this.year,
      assessments: this.assessments,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Assessmentstandards', assessmentstandardsSchema)

export const schema = model.schema
export default model
