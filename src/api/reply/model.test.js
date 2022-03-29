import { Reply } from '.'
import { User } from '../user'

let user, reply

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  reply = await Reply.create({ userID: user, assesID: 'test', groupID: 'test', reply: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = reply.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(reply.id)
    expect(typeof view.userID).toBe('object')
    expect(view.userID.id).toBe(user.id)
    expect(view.assesID).toBe(reply.assesID)
    expect(view.groupID).toBe(reply.groupID)
    expect(view.reply).toBe(reply.reply)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = reply.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(reply.id)
    expect(typeof view.userID).toBe('object')
    expect(view.userID.id).toBe(user.id)
    expect(view.assesID).toBe(reply.assesID)
    expect(view.groupID).toBe(reply.groupID)
    expect(view.reply).toBe(reply.reply)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
