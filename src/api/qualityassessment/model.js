import mongoose, { Schema } from 'mongoose'

const qualityassessmentSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  AssessID: {
    type: Schema.ObjectId,
    ref: "Assessment"
  },
  RefereeGroup: {
    type: Schema.ObjectId,
    ref: "Refereegroup"
  },
  qualitylevel: {
    type: Number
  },
  prominent: {
    type: String
  },
  developed: {
    type: String
  },
  counsel: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

qualityassessmentSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      AssessID: this.AssessID,
      RefereeGroup: this.RefereeGroup,
      qualitylevel: this.qualitylevel,
      prominent: this.prominent,
      developed: this.developed,
      counsel: this.counsel,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Qualityassessment', qualityassessmentSchema)

export const schema = model.schema
export default model
