import mongoose, { Schema } from 'mongoose'

const replySchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assesID: {
    type: Schema.Types.ObjectId,
    ref: 'Assessment',
    required: true
  },
  groupID: {
    type: Schema.Types.ObjectId,
    ref: 'Group',
    required: true

  },
  reply: [{
    fieldID: {
      type: Schema.Types.ObjectId,
      required: true
    },
    variable: {
      type: Schema.Types.String
    },
    value: {
      type: Schema.Types.String
    }

  }]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

replySchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      userID: this.userID.view(full),
      assesID: this.assesID,
      groupID: this.groupID,
      reply: this.reply,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Reply', replySchema)

export const schema = model.schema
export default model
