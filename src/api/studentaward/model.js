import mongoose, { Schema } from 'mongoose'

const studentawardSchema = new Schema({
  name: {
    type: String
  },
  year: {
    type: Number
  },
  award: {
    type: String
  },
  type: {
    type: Number
    // 3 รางวัลประเภทอื่น ๆ
    // 2 ทักษะวิชาชีพ
    // 1 สิ่งประดิษฐ์
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
  students: [String]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

studentawardSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      year: this.year,
      award: this.award,
      type: this.type,
      level: this.level,
      org: this.org,
      students: this.students,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Studentaward', studentawardSchema)

export const schema = model.schema
export default model
