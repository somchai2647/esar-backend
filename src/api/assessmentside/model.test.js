import { Assessmentside } from '.'

let assessmentside

beforeEach(async () => {
  assessmentside = await Assessmentside.create({ title: 'test', description: 'test', priority: 'test', type: 'test', year: 'test', assessments: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = assessmentside.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(assessmentside.id)
    expect(view.title).toBe(assessmentside.title)
    expect(view.description).toBe(assessmentside.description)
    expect(view.priority).toBe(assessmentside.priority)
    expect(view.type).toBe(assessmentside.type)
    expect(view.year).toBe(assessmentside.year)
    expect(view.assessments).toBe(assessmentside.assessments)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = assessmentside.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(assessmentside.id)
    expect(view.title).toBe(assessmentside.title)
    expect(view.description).toBe(assessmentside.description)
    expect(view.priority).toBe(assessmentside.priority)
    expect(view.type).toBe(assessmentside.type)
    expect(view.year).toBe(assessmentside.year)
    expect(view.assessments).toBe(assessmentside.assessments)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
