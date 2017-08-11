const INITIAL_STATE = {
  notes: [],
  q: '',
  error: null,
  pageIndex: 0,
  pageSize: 20
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'notes':
      return { ...state, notes: action.payload, error: null };
    case 'change-q':
      return { ...state, q: action.value, error: null, pageIndex: 0 };
    case 'error':
      return { ...state, error: action.error };
    case 'more':
      return { ...state, pageIndex: state.pageIndex + 1 };
    default:
      return state;
  }
}
