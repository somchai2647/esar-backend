import { Attach } from '.'
import { User } from '../user'

let user, attach

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  attach = await Attach.create({ user, url: 'test', AssesID: 'test', GroupID: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = attach.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(attach.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.url).toBe(attach.url)
    expect(view.AssesID).toBe(attach.AssesID)
    expect(view.GroupID).toBe(attach.GroupID)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = attach.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(attach.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.url).toBe(attach.url)
    expect(view.AssesID).toBe(attach.AssesID)
    expect(view.GroupID).toBe(attach.GroupID)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
