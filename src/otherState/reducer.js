export const reducer = (state, action) => {
  switch (action.type) {
    case "IS_AUTH":
      return {
        ...state,
        isAuth: true,
        data: action.data,
      };
    default:
      return { ...state };
  }
};
