import axios from "axios";

let defaultState = {
  user: {
    firstName: "admin",
  },
};

let CreateUserReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "CreateUser":
      let newState = { ...state };
      newState = {
        user: { ...action.payload },
      };
      return newState;
    default:
      return state;
  }
};

export default CreateUserReducer;
