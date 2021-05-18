import { TABLE_RESIZE } from './types';

export function rootReducer(state, action) {
  switch (action.type) {
    case TABLE_RESIZE: {
      const newColState = state.colState || {};
      newColState[action.data.id] = action.data.value;
      return { ...state, colState: newColState};
    }
    default:
      return state;
  }
}
