import { TABLE_RESIZE } from './types';

export function rootReducer(state, action) {
  switch (action.type) {
    case TABLE_RESIZE: {
      const {id, type, value} = action.data;

      const property = type === 'col'
        ? 'colState'
        : 'rowState';

      return { ...state, [property]: { ...state[property], [id]: value } };
    }
    default:
      return state;
  }
}
