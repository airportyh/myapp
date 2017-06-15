const INITIAL_STATE = {
  notes: []
};

export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === 'notes') {
    return {
      ...state,
      notes: action.payload
    };
  }
  return state;
}
