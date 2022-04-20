import { Qualityassessment } from '.'
import { User } from '../user'

let user, qualityassessment

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  qualityassessment = await Qualityassessment.create({ user, AssessID: 'test', RefereeGroup: 'test', qualitylevel: 'test', prominent: 'test', developed: 'test', counsel: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = qualityassessment.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(qualityassessment.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.AssessID).toBe(qualityassessment.AssessID)
    expect(view.RefereeGroup).toBe(qualityassessment.RefereeGroup)
    expect(view.qualitylevel).toBe(qualityassessment.qualitylevel)
    expect(view.prominent).toBe(qualityassessment.prominent)
    expect(view.developed).toBe(qualityassessment.developed)
    expect(view.counsel).toBe(qualityassessment.counsel)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = qualityassessment.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(qualityassessment.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.AssessID).toBe(qualityassessment.AssessID)
    expect(view.RefereeGroup).toBe(qualityassessment.RefereeGroup)
    expect(view.qualitylevel).toBe(qualityassessment.qualitylevel)
    expect(view.prominent).toBe(qualityassessment.prominent)
    expect(view.developed).toBe(qualityassessment.developed)
    expect(view.counsel).toBe(qualityassessment.counsel)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
