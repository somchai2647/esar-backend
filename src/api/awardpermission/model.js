import mongoose, { Schema } from 'mongoose'

const awardpermissionSchema = new Schema({
  groupID: {
    type: Schema.Types.ObjectId,
    ref: 'Group'
  },
  year: {
    type: Number
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

awardpermissionSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      groupID: this.groupID,
      year: this.year,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Awardpermission', awardpermissionSchema)

export const schema = model.schema
export default model
