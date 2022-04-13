import { Collegeaward } from '.'

let collegeaward

beforeEach(async () => {
  collegeaward = await Collegeaward.create({ name: 'test', year: 'test', award: 'test', level: 'test', org: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = collegeaward.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(collegeaward.id)
    expect(view.name).toBe(collegeaward.name)
    expect(view.year).toBe(collegeaward.year)
    expect(view.award).toBe(collegeaward.award)
    expect(view.level).toBe(collegeaward.level)
    expect(view.org).toBe(collegeaward.org)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = collegeaward.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(collegeaward.id)
    expect(view.name).toBe(collegeaward.name)
    expect(view.year).toBe(collegeaward.year)
    expect(view.award).toBe(collegeaward.award)
    expect(view.level).toBe(collegeaward.level)
    expect(view.org).toBe(collegeaward.org)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
