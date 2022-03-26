import { General } from '.'

let general

beforeEach(async () => {
  general = await General.create({ academy: 'test', year: 'test', director: 'test', executiveResource: 'test', executivePlanning: 'test', executiveAffairs: 'test', executiveDepartment: 'test', leaderQA: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = general.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(general.id)
    expect(view.academy).toBe(general.academy)
    expect(view.year).toBe(general.year)
    expect(view.director).toBe(general.director)
    expect(view.executiveResource).toBe(general.executiveResource)
    expect(view.executivePlanning).toBe(general.executivePlanning)
    expect(view.executiveAffairs).toBe(general.executiveAffairs)
    expect(view.executiveDepartment).toBe(general.executiveDepartment)
    expect(view.leaderQA).toBe(general.leaderQA)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = general.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(general.id)
    expect(view.academy).toBe(general.academy)
    expect(view.year).toBe(general.year)
    expect(view.director).toBe(general.director)
    expect(view.executiveResource).toBe(general.executiveResource)
    expect(view.executivePlanning).toBe(general.executivePlanning)
    expect(view.executiveAffairs).toBe(general.executiveAffairs)
    expect(view.executiveDepartment).toBe(general.executiveDepartment)
    expect(view.leaderQA).toBe(general.leaderQA)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
