import { Assessmentpermission } from '.'

let assessmentpermission

beforeEach(async () => {
  assessmentpermission = await Assessmentpermission.create({ assesID: 'test', groupID: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = assessmentpermission.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(assessmentpermission.id)
    expect(view.assesID).toBe(assessmentpermission.assesID)
    expect(view.groupID).toBe(assessmentpermission.groupID)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = assessmentpermission.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(assessmentpermission.id)
    expect(view.assesID).toBe(assessmentpermission.assesID)
    expect(view.groupID).toBe(assessmentpermission.groupID)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
