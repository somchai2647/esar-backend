import crypto from 'crypto'
import bcrypt from 'bcrypt'
import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'
import { env } from '../../config'

const roles = ['user', 'admin', 'referee', 'officer', 'executive'];

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    default: "123456789",
    minlength: 6
  },
  name: {
    type: String,
    index: true,
    trim: true
  },
  tel: {
    type: String,
    minlength: 10
  },
  email: {
    type: String,
  },
  role: {
    type: String,
    enum: roles,
    default: 'user'
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: "Group"
  },
  picture: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
})



userSchema.path('username').set(function (username) {
  if (!this.picture || this.picture.indexOf('https://gravatar.com') === 0) {
    const hash = crypto.createHash('md5').update(username).digest('hex')
    this.picture = `https://gravatar.com/avatar/${hash}?d=identicon`
  }

  if (!this.name) {
    this.name = username.replace(/^(.+)@.+$/, '$1')
  }

  return username
})

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()

  /* istanbul ignore next */
  const rounds = env === 'test' ? 1 : 9

  bcrypt.hash(this.password, rounds).then((hash) => {
    this.password = hash
    next()
  }).catch(next)
})

userSchema.methods = {
  view(full) {
    const view = {}
    let fields = ['id', 'name', 'picture', 'role', 'group', 'tel', 'email']

    if (full) {
      fields = [...fields, 'username', 'createdAt']
    }

    fields.forEach((field) => { view[field] = this[field] })

    return view
  },

  authenticate(password) {
    return bcrypt.compare(password, this.password).then((valid) => valid ? this : false)
  }

}

userSchema.statics = {
  roles
}

userSchema.plugin(mongooseKeywords, { paths: ['username', 'name'] })

const model = mongoose.model('User', userSchema)

export const schema = model.schema
export default model
