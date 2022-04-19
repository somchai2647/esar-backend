import { Refereegroup } from '.'

let refereegroup

beforeEach(async () => {
  refereegroup = await Refereegroup.create({ name: 'test', description: 'test', leader: 'test', users: 'test', year: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = refereegroup.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(refereegroup.id)
    expect(view.name).toBe(refereegroup.name)
    expect(view.description).toBe(refereegroup.description)
    expect(view.leader).toBe(refereegroup.leader)
    expect(view.users).toBe(refereegroup.users)
    expect(view.year).toBe(refereegroup.year)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = refereegroup.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(refereegroup.id)
    expect(view.name).toBe(refereegroup.name)
    expect(view.description).toBe(refereegroup.description)
    expect(view.leader).toBe(refereegroup.leader)
    expect(view.users).toBe(refereegroup.users)
    expect(view.year).toBe(refereegroup.year)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
