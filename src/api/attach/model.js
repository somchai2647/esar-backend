import mongoose, { Schema } from 'mongoose'

const attachSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  url: {
    type: String
  },
  AssesID: {
    type: Schema.Types.ObjectId,
    ref: 'Assessment',
  },
  GroupID: {
    type: Schema.Types.ObjectId,
    ref: 'Group',
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

attachSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      url: this.url,
      AssesID: this.AssesID,
      GroupID: this.GroupID,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Attach', attachSchema)

export const schema = model.schema
export default model
