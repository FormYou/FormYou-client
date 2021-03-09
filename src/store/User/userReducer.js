import Cookies from 'js-cookie';

const initialState = {
  name: Cookies.get('userName'),
  role: Cookies.get('userRole'),
  token: Cookies.get('token')
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      Cookies.set('userName', action.name);
      Cookies.set('userRole', action.role);
      Cookies.set('token', action.token);
      return {
        ...state,
        name: action.name,
        role: action.role,
        token: action.token
      }
    default:
      return state;
  }
};

export default userReducer;
