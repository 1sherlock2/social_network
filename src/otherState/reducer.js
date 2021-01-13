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
    case "OUT_FROM_ROOM":
      return {
        data: null,
        isAuth: false,
        createdRoom: null
      }
    default:
      return state;
  }
};
