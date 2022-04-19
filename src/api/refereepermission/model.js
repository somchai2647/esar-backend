import mongoose, { Schema } from 'mongoose'

const refereepermissionSchema = new Schema({
  assessID: {
    type: Schema.Types.ObjectId,
    ref: "Assessment"
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User"
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

refereepermissionSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      assessID: this.assessID,
      userID: this.userID,
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

const model = mongoose.model('Refereepermission', refereepermissionSchema)

export const schema = model.schema
export default model
