import { Summarize } from '.'

let summarize

beforeEach(async () => {
  summarize = await Summarize.create({ title: 'test', description: 'test', priority: 'test', year: 'test', standards: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = summarize.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(summarize.id)
    expect(view.title).toBe(summarize.title)
    expect(view.description).toBe(summarize.description)
    expect(view.priority).toBe(summarize.priority)
    expect(view.year).toBe(summarize.year)
    expect(view.standards).toBe(summarize.standards)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = summarize.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(summarize.id)
    expect(view.title).toBe(summarize.title)
    expect(view.description).toBe(summarize.description)
    expect(view.priority).toBe(summarize.priority)
    expect(view.year).toBe(summarize.year)
    expect(view.standards).toBe(summarize.standards)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
