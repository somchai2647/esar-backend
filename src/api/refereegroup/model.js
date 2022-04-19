import mongoose, { Schema } from 'mongoose'

const refereegroupSchema = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  leader: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  users: [{
    userid: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  }],
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

refereegroupSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      description: this.description,
      leader: this.leader,
      users: this.users,
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

const model = mongoose.model('Refereegroup', refereegroupSchema)

export const schema = model.schema
export default model
