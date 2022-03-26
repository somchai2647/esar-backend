import { Assessment } from '.'

let assessment

beforeEach(async () => {
  assessment = await Assessment.create({ priority: 'test', year: 'test', title: 'test', description: 'test', descriptionHTML: 'test', status: 'test', type: 'test', url: 'test', formula: 'test', aggregate: 'test', countrows: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = assessment.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(assessment.id)
    expect(view.priority).toBe(assessment.priority)
    expect(view.year).toBe(assessment.year)
    expect(view.title).toBe(assessment.title)
    expect(view.description).toBe(assessment.description)
    expect(view.descriptionHTML).toBe(assessment.descriptionHTML)
    expect(view.status).toBe(assessment.status)
    expect(view.type).toBe(assessment.type)
    expect(view.url).toBe(assessment.url)
    expect(view.formula).toBe(assessment.formula)
    expect(view.aggregate).toBe(assessment.aggregate)
    expect(view.countrows).toBe(assessment.countrows)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = assessment.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(assessment.id)
    expect(view.priority).toBe(assessment.priority)
    expect(view.year).toBe(assessment.year)
    expect(view.title).toBe(assessment.title)
    expect(view.description).toBe(assessment.description)
    expect(view.descriptionHTML).toBe(assessment.descriptionHTML)
    expect(view.status).toBe(assessment.status)
    expect(view.type).toBe(assessment.type)
    expect(view.url).toBe(assessment.url)
    expect(view.formula).toBe(assessment.formula)
    expect(view.aggregate).toBe(assessment.aggregate)
    expect(view.countrows).toBe(assessment.countrows)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
