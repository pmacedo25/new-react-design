import { shortenList, startCaseFromPath } from './formatters'

describe('formatters', () => {
  it('formats folder names from a path', () => {
    expect(startCaseFromPath('src/app-shell')).toBe('App Shell')
  })

  it('limits an array without mutating it', () => {
    const values = ['a', 'b', 'c']

    expect(shortenList(values, 2)).toEqual(['a', 'b'])
    expect(values).toEqual(['a', 'b', 'c'])
  })
})
