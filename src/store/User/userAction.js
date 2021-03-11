export const setUser = (name, role, checked, token, id) => ({
    type: "SET_USER",
    name,
    role,
    checked,
    token,
    id
});

export const setLogout = () => ({
  type: "SET_LOGOUT"
});
