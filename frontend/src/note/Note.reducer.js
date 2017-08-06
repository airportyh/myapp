const INITIAL_STATE = {
  note: {
    title: '',
    text: ''
  },
  editing: false,
  dirty: false,
  intervalTimerId: null
};

export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === 'note') {
    return {
      ...state,
      note: action.payload,
      dirty: false
    };
  } else if (action.type === 'set-edit-mode') {
    return {
      ...state,
      editing: true
    };
  } else if (action.type === 'change') {
    return {
      ...state,
      note: {
        ...state.note,
        [action.prop]: action.value
      },
      dirty: true
    };
  }
  return state;
}
