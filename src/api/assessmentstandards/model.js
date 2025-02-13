import mongoose, { Schema } from 'mongoose'

const assessmentstandardsSchema = new Schema({
  title: {
    type: String
  },
  priority: {
    type: Number
  },
  summarize: {
    type: Schema.Types.ObjectId,
    ref: "Summarize"
  },
  assessmentsides: [{
    type: Schema.Types.ObjectId,
    ref: "Assessmentside"
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
      priority: this.priority,
      summarize: this.summarize,
      assessmentsides: this.assessmentsides,
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
