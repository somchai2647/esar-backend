import { Awardpermission } from '.'

let awardpermission

beforeEach(async () => {
  awardpermission = await Awardpermission.create({ groupID: 'test', year: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = awardpermission.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(awardpermission.id)
    expect(view.groupID).toBe(awardpermission.groupID)
    expect(view.year).toBe(awardpermission.year)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = awardpermission.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(awardpermission.id)
    expect(view.groupID).toBe(awardpermission.groupID)
    expect(view.year).toBe(awardpermission.year)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
