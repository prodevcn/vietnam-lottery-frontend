const INITIAL_STATE = {
  isLoading: false,
  error: {},
  message: null,
  restrictList: {
    northern: false,
    southern_hochiminh: false,
    central_quangnam: false,
  }
  
};


const commonReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'RESTRICT_NORTHERN':
      return {
        ...state,
        restrictList: {
          ...state.restrictList,
          northern: true
        }
      }
    case 'ENABLE_NORTHERN':
      return {
        ...state,
        restrictList: {
          ...state.restrictList,
          northern: false,
        }
      }
    case 'RESTRICT_SOUTHERN_HOCHIMINH':
      return {
        ...state,
        restrictList: {
          ...state.restrictList,
          southern_hochiminh: true
        }
      }
    case 'ENABLE_SOUTHERN_HOCHIMINH':
      return {
        ...state,
        restrictList: {
          ...state.restrictList,
          southern_hochiminh: false,
        }
      }
    case 'RESTRICT_CENTRAL_QUANGNAM':
      return {
        ...state,
        restrictList: {
          ...state.restrictList,
          central_quangnam: true
        }
      }
    case 'ENABLE_CENTRAL_QUANGNAM':
      return {
        ...state,
        restrictList: {
          ...state.restrictList,
          central_quangnam: false
        }
      }
    default:
      return state; 
  }
};

export default commonReducer;
