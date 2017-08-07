const INITIAL_STATE = {
  notes: [],
  q: '',
  error: null
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'notes':
      return {
        ...state,
        notes: action.payload
      };
    case 'change-q':
      return {
        ...state,
        q: action.value
      };
    case 'error':
      return {
        ...state,
        error: action.error
      }
    default:
      return state;
  }
}
