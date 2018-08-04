import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  it('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  it('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  it('send action zero and expect all to be 0', () => {
      const testState = {
          good: 4,
          ok: 6,
          bad: 0
      }
      const action = {
          type: 'ZERO'
      }
      const state = testState
      deepFreeze(state)
      expect(state.good).toEqual(4)
      const zeroState = counterReducer(state, action)
      expect(zeroState).toEqual({
          good: 0,
          ok: 0,
          bad: 0
      })
  })
})