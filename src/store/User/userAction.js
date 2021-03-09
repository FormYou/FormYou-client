export const setUser = (name, role, token) => ({
    type: "SET_USER",
    name,
    role,
    token
});

export const setLogout = () => ({
  type: "SET_LOGOUT"
});
