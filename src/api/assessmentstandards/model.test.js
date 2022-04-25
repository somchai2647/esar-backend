import { Assessmentstandards } from '.'

let assessmentstandards

beforeEach(async () => {
  assessmentstandards = await Assessmentstandards.create({ title: 'test', description: 'test', year: 'test', assessments: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = assessmentstandards.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(assessmentstandards.id)
    expect(view.title).toBe(assessmentstandards.title)
    expect(view.description).toBe(assessmentstandards.description)
    expect(view.year).toBe(assessmentstandards.year)
    expect(view.assessments).toBe(assessmentstandards.assessments)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = assessmentstandards.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(assessmentstandards.id)
    expect(view.title).toBe(assessmentstandards.title)
    expect(view.description).toBe(assessmentstandards.description)
    expect(view.year).toBe(assessmentstandards.year)
    expect(view.assessments).toBe(assessmentstandards.assessments)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
