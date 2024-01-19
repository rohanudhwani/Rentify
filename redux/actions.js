// actions.js

export const UPDATE_FILTERS = 'UPDATE_FILTERS';

export const updateFilters = (filters) => ({
  type: UPDATE_FILTERS,
  payload: filters,
});
