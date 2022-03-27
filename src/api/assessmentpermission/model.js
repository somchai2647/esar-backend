import mongoose, { Schema } from 'mongoose'

const assessmentpermissionSchema = new Schema({
  assessment: {
    type: Schema.Types.ObjectId,
    ref: 'Assessment'
  },
  groupID: {
    type: Schema.Types.ObjectId,
    ref: 'Group'
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

assessmentpermissionSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      assessment: this.assessment,
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
