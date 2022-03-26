import mongoose, { Schema } from 'mongoose'

const assessmentSchema = new Schema({
  priority: {
    type: String
  },
  year: {
    type: Number
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  descriptionHTML: {
    type: String
  },
  status: {
    type: Boolean
  },
  type: {
    type: String
  },
  url: {
    type: Boolean
  },
  formula: {
    type: String
  },
  aggregate: {
    type: Boolean
  },
  countrows: {
    type: Boolean
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

assessmentSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      priority: this.priority,
      year: this.year,
      title: this.title,
      description: this.description,
      descriptionHTML: this.descriptionHTML,
      status: this.status,
      type: this.type,
      url: this.url,
      formula: this.formula,
      aggregate: this.aggregate,
      countrows: this.countrows,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Assessment', assessmentSchema)

export const schema = model.schema
export default model
