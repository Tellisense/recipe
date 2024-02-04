import {
  FETCH_ALL_RECIPE_IDS_BEGIN,
  FETCH_ALL_RECIPE_IDS_SUCCESS,
  FETCH_ALL_RECIPE_IDS_FAILURE,
} from "../actions/types"

const initialState = {
  ids: [],
  loading: false,
  error: null,
}

function allRecipeIdsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_RECIPE_IDS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case FETCH_ALL_RECIPE_IDS_SUCCESS:
      return {
        ...state,
        loading: false,
        ids: action.payload.ids,
      }

    case FETCH_ALL_RECIPE_IDS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        ids: [],
      }

    default:
      return state
  }
}

export default allRecipeIdsReducer
