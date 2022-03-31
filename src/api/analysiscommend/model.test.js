import { Analysiscommend } from '.'
import { User } from '../user'

let user, analysiscommend

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  analysiscommend = await Analysiscommend.create({ user, prominent: 'test', developed: 'test', counsel: 'test', GroupID: 'test', AssesID: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = analysiscommend.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(analysiscommend.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.prominent).toBe(analysiscommend.prominent)
    expect(view.developed).toBe(analysiscommend.developed)
    expect(view.counsel).toBe(analysiscommend.counsel)
    expect(view.GroupID).toBe(analysiscommend.GroupID)
    expect(view.AssesID).toBe(analysiscommend.AssesID)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = analysiscommend.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(analysiscommend.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.prominent).toBe(analysiscommend.prominent)
    expect(view.developed).toBe(analysiscommend.developed)
    expect(view.counsel).toBe(analysiscommend.counsel)
    expect(view.GroupID).toBe(analysiscommend.GroupID)
    expect(view.AssesID).toBe(analysiscommend.AssesID)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
