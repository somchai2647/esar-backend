import mongoose, { Schema } from 'mongoose'

const assessmentpermissionSchema = new Schema({
  assesID: {
    type: String
  },
  groupID: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

assessmentpermissionSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      assesID: this.assesID,
      groupID: this.groupID,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Assessmentpermission', assessmentpermissionSchema)

export const schema = model.schema
export default model
