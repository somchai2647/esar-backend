import mongoose, { Schema } from 'mongoose'

const analysiscommendSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isReferee: {
    type: Boolean,
    default: false
  },
  qualitylevel: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  prominent: {
    type: String
  },
  prominent: {
    type: String
  },
  developed: {
    type: String
  },
  counsel: {
    type: String
  },
  comment: {
    type: String
  },
  GroupID: {
    type: Schema.Types.ObjectId,
    ref: 'Group',
    required: true
  },
  AssesID: {
    type: Schema.Types.ObjectId,
    ref: 'Assessment',
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

analysiscommendSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      isReferee: this.isReferee,
      qualitylevel: this.qualitylevel,
      prominent: this.prominent,
      developed: this.developed,
      counsel: this.counsel,
      comment: this.comment,
      GroupID: this.GroupID,
      AssesID: this.AssesID,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Analysiscommend', analysiscommendSchema)

export const schema = model.schema
export default model
