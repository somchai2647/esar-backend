import mongoose, { Schema } from 'mongoose'

const fieldsSchema = new Schema({
  assesID: {
    type: Schema.Types.ObjectId
  },
  title: {
    type: String
  },
  variable: {
    type: String
  },
  isReadOnly: {
    type: Boolean
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

fieldsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      assesID: this.assesID,
      title: this.title,
      variable: this.variable,
      isReadOnly: this.isReadOnly,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Fields', fieldsSchema)

export const schema = model.schema
export default model
