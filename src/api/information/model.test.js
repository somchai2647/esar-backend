import { Information } from '.'

let information

beforeEach(async () => {
  information = await Information.create({ title: 'test', isURL: 'test', URL: 'test', detail: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = information.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(information.id)
    expect(view.title).toBe(information.title)
    expect(view.isURL).toBe(information.isURL)
    expect(view.URL).toBe(information.URL)
    expect(view.detail).toBe(information.detail)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = information.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(information.id)
    expect(view.title).toBe(information.title)
    expect(view.isURL).toBe(information.isURL)
    expect(view.URL).toBe(information.URL)
    expect(view.detail).toBe(information.detail)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
