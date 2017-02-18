import { combineReducers } from 'redux';
import { merge } from 'ramda';

export const byId = (state = {}, { type, payload }) => {
  switch (type) {
    case 'app/replaceDays':
      return payload.Days;
    default:
      return state;
  }
};

export const ids = (state = [], { type, payload }) => {
  switch (type) {
    case 'app/replaceNotes':
      return payload.ids;
    default:
      return state;
  }
};

export const toast = (state = null, { type, payload }) => {
  switch (type) {
    case 'app/setToast':
      return payload;
    case 'app/clearToast':
      return null;
    default:
      return state;
  }
};

export const requests = (state = {}, { type, payload, meta }) => {
  switch (type) {
    case 'app/markRequestPending':
      return merge(state, { [meta.key]: { status: 'pending', error: null } });
    case 'app/markRequestSuccess':
      return merge(state, { [meta.key]: { status: 'success', error: null } });
    case 'app/markRequestFailed':
      return merge(state, { [meta.key]: { status: 'failure', error: payload } });
    default:
      return state;
  }
};

export default combineReducers({
  days: combineReducers({
    byId,
    ids,
  }),
  ui: combineReducers({
    toast,
  }),
  requests,
});
