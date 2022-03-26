import { Fields } from '.'

let fields

beforeEach(async () => {
  fields = await Fields.create({ assesID: 'test', title: 'test', variable: 'test', isReadOnly: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = fields.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(fields.id)
    expect(view.assesID).toBe(fields.assesID)
    expect(view.title).toBe(fields.title)
    expect(view.variable).toBe(fields.variable)
    expect(view.isReadOnly).toBe(fields.isReadOnly)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = fields.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(fields.id)
    expect(view.assesID).toBe(fields.assesID)
    expect(view.title).toBe(fields.title)
    expect(view.variable).toBe(fields.variable)
    expect(view.isReadOnly).toBe(fields.isReadOnly)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
