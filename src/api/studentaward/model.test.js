import { Studentaward } from '.'

let studentaward

beforeEach(async () => {
  studentaward = await Studentaward.create({ name: 'test', year: 'test', award: 'test', type: 'test', level: 'test', org: 'test', students: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = studentaward.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(studentaward.id)
    expect(view.name).toBe(studentaward.name)
    expect(view.year).toBe(studentaward.year)
    expect(view.award).toBe(studentaward.award)
    expect(view.type).toBe(studentaward.type)
    expect(view.level).toBe(studentaward.level)
    expect(view.org).toBe(studentaward.org)
    expect(view.students).toBe(studentaward.students)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = studentaward.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(studentaward.id)
    expect(view.name).toBe(studentaward.name)
    expect(view.year).toBe(studentaward.year)
    expect(view.award).toBe(studentaward.award)
    expect(view.type).toBe(studentaward.type)
    expect(view.level).toBe(studentaward.level)
    expect(view.org).toBe(studentaward.org)
    expect(view.students).toBe(studentaward.students)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
