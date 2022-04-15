import mongoose, { Schema } from 'mongoose'

const teacherawardSchema = new Schema({
  name: {
    type: String
  },
  teachername: {
    type: String
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

teacherawardSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      teachername: this.teachername,
      award: this.award,
      level: this.level,
      org: this.org,
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

const model = mongoose.model('Teacheraward', teacherawardSchema)

export const schema = model.schema
export default model
