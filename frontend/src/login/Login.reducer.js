const INITIAL_STATE = {
  token: null
};

export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === 'login-success') {
    return {
      ...state,
      token: action.info.token
    };
  }
  return state;
}
