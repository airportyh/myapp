const INITIAL_STATE = {
  token: null
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'login-token':
      return {
        ...state,
        token: action.token
      };
    case 'error':
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}
