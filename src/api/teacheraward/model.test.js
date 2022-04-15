import { Teacheraward } from '.'

let teacheraward

beforeEach(async () => {
  teacheraward = await Teacheraward.create({ name: 'test', teachername: 'test', award: 'test', level: 'test', org: 'test', year: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = teacheraward.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(teacheraward.id)
    expect(view.name).toBe(teacheraward.name)
    expect(view.teachername).toBe(teacheraward.teachername)
    expect(view.award).toBe(teacheraward.award)
    expect(view.level).toBe(teacheraward.level)
    expect(view.org).toBe(teacheraward.org)
    expect(view.year).toBe(teacheraward.year)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = teacheraward.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(teacheraward.id)
    expect(view.name).toBe(teacheraward.name)
    expect(view.teachername).toBe(teacheraward.teachername)
    expect(view.award).toBe(teacheraward.award)
    expect(view.level).toBe(teacheraward.level)
    expect(view.org).toBe(teacheraward.org)
    expect(view.year).toBe(teacheraward.year)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
