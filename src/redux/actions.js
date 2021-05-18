import { TABLE_RESIZE } from './types';

// Action Creater
export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data,
  };
}
