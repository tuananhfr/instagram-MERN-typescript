export const getTokenFromLocalStorage: any = () => {
  return localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!) // Use the "!" operator to tell TypeScript that the value is not null.
    : null;
};

export const config = () => ({
  credentials: "include",
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage().token}`,
    Accept: "application/json",
  },
});
