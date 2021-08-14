const INITIAL_STATE = {
  isLoading: false,
  error: {},
  message: null,
};


const commonReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state; 
  }
};

export default commonReducer;
