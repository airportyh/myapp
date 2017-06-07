const INITIAL_STATE = {
  friends: []
};

export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === 'friends') {
    return {
      ...state,
      friends: action.friends
    };
  }
  return state;
}
