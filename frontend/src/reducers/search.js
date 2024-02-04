import {
  SEARCH_RECIPES_BEGIN,
  SEARCH_RECIPES_SUCCESS,
  SEARCH_RECIPES_FAILURE,
} from "../actions/types"

const initialState = {
  recipes: null,
  isLoading: false,
  error: null,
}

const searchFetching = (state) => {
  return { ...state, isLoading: true }
}

const searchFetched = (state, payload) => {
  return { ...state, isLoading: false, recipes: payload }
}

const searchFailed = (state, payload) => {
  return { ...state, isLoading: false, error: payload }
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SEARCH_RECIPES_BEGIN:
      return searchFetching()
    case SEARCH_RECIPES_SUCCESS:
      return searchFetched(state, payload)
    case SEARCH_RECIPES_FAILURE:
      return searchFailed(state, payload)
    default:
      return state
  }
}
