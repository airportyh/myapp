const INITIAL_STATE = {
  note: {
    title: '',
    text: ''
  },
  editing: false,
  pendingCount: 0
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'note':
      return { ...state, note: action.payload };
    case 'push-update':
      return { ...state, pendingCount: state.pendingCount + 1 };
    case 'pop-update':
      return { ...state, pendingCount: state.pendingCount - 1, dirty: false };
    case 'dirty':
      return { ...state, dirty: true };
    default:
      return state;
  }
}
