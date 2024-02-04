import {
  FETCH_RECIPE_BEGIN,
  FETCH_RECIPE_SUCCESS,
  FETCH_RECIPE_FAILURE,
} from "./types"

export const fetchRecipeBegin = () => ({
  type: FETCH_RECIPE_BEGIN,
})

export const fetchRecipeSuccess = (recipe) => ({
  type: FETCH_RECIPE_SUCCESS,
  payload: { recipe },
})

export const fetchRecipeFailure = (error) => ({
  type: FETCH_RECIPE_FAILURE,
  payload: { error },
})

export function fetchRecipe(id) {
  return (dispatch) => {
    dispatch(fetchRecipeBegin())
    return fetch(`/api/recipe/${id}`)
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchRecipeSuccess(json))
        return json
      })
      .catch((error) => dispatch(fetchRecipeFailure(error)))
  }
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}
