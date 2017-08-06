const INITIAL_STATE = {
  notes: [],
  q: ''
};

export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === 'notes') {
    return {
      ...state,
      notes: action.payload
    };
  } else if (action.type === 'change-q') {
    return {
      ...state,
      q: action.value
    };
  }
  return state;
}
