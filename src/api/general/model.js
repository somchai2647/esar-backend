import mongoose, { Schema } from 'mongoose'

const generalSchema = new Schema({
  academy: {
    type: String
  },
  year: {
    type: Number
  },
  director: {
    type: String
  },
  executiveResource: {
    type: String
  },
  executivePlanning: {
    type: String
  },
  executiveAffairs: {
    type: String
  },
  executiveDepartment: {
    type: String
  },
  leaderQA: {
    type: String
  },
  userAccess: {
    type: Boolean,
  },
  refereeAccess: {
    type: Boolean,
  },
  officerAccess: {
    type: Boolean,
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

generalSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      academy: this.academy,
      year: this.year,
      director: this.director,
      executiveResource: this.executiveResource,
      executivePlanning: this.executivePlanning,
      executiveAffairs: this.executiveAffairs,
      executiveDepartment: this.executiveDepartment,
      userAccess: this.userAccess,
      refereeAccess: this.refereeAccess,
      officerAccess: this.officerAccess,
      leaderQA: this.leaderQA,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('General', generalSchema)

export const schema = model.schema
export default model
