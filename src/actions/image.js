import { UPDATE_IMAGE } from '../constants';

export function updateImage(image) {
  return { payload: image, type: UPDATE_IMAGE };
}
