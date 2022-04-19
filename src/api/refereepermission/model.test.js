import { Refereepermission } from '.'

let refereepermission

beforeEach(async () => {
  refereepermission = await Refereepermission.create({ assessID: 'test', userID: 'test', year: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = refereepermission.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(refereepermission.id)
    expect(view.assessID).toBe(refereepermission.assessID)
    expect(view.userID).toBe(refereepermission.userID)
    expect(view.year).toBe(refereepermission.year)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = refereepermission.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(refereepermission.id)
    expect(view.assessID).toBe(refereepermission.assessID)
    expect(view.userID).toBe(refereepermission.userID)
    expect(view.year).toBe(refereepermission.year)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
