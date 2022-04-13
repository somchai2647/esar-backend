import mongoose, { Schema } from 'mongoose'

const collegeawardSchema = new Schema({
  name: {
    type: String
  },
  year: {
    type: Number
  },
  award: {
    type: String
  },
  level: {
    type: Number
    // 4 ระดับนานาชาติ
    // 3 ระดับชาติ
    // 2 ระดับภาค
    // 1 ระดับจังหวัด
  },
  org: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

collegeawardSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      year: this.year,
      award: this.award,
      level: this.level,
      org: this.org,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Collegeaward', collegeawardSchema)

export const schema = model.schema
export default model
