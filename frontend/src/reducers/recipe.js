import {
  FETCH_RECIPE_BEGIN,
  FETCH_RECIPE_SUCCESS,
  FETCH_RECIPE_FAILURE,
} from "../actions/types"

const initialState = {
  items: [],
  loading: false,
  error: null,
}

export default function recipeReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_RECIPE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case FETCH_RECIPE_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.recipe,
      }

    case FETCH_RECIPE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: [],
      }

    default:
      return state
  }
}
