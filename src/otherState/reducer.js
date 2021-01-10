export const reducer = (state, action) => {
  switch (action.type) {
    case "IS_AUTH":
      return {
        ...state,
        isAuth: true,
        data: action.data,
      };
    case "CREATED_ROOM":
      return {
        ...state,
        createdRoom: action.createdRoom
      }
    default:
      return state;
  }
};
