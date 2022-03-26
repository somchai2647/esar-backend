import mongoose, { Schema } from 'mongoose'

const informationSchema = new Schema({
  title: {
    type: String
  },
  isURL: {
    type: Boolean
  },
  URL: {
    type: String,
    default: ""
  },
  detail: {
    type: String
  },
  detailN: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

informationSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      title: this.title,
      isURL: this.isURL,
      URL: this.URL,
      detail: this.detail,
      detailN: this.detailN,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Information', informationSchema)

export const schema = model.schema
export default model
