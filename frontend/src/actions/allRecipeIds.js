import {
  FETCH_ALL_RECIPE_IDS_BEGIN,
  FETCH_ALL_RECIPE_IDS_SUCCESS,
  FETCH_ALL_RECIPE_IDS_FAILURE,
} from "./types.js"

export const fetchAllRecipesBegin = () => ({
  type: FETCH_ALL_RECIPE_IDS_BEGIN,
})

export const fetchAllRecipesSuccess = (ids) => ({
  type: FETCH_ALL_RECIPE_IDS_SUCCESS,
  payload: { ids },
})

export const fetchAllRecipesFailure = (error) => ({
  type: FETCH_ALL_RECIPE_IDS_FAILURE,
  payload: { error },
})

// export const fetchAllRecipes = () => {
//   return async (dispatch) => {
//     dispatch(fetchAllRecipesBegin())
//     return fetch(`/api/allrecipesIds`)
//       .then(handleErrors)
//       .then((response) => response.json())
//       .then((ids) => {
//         const fetchPromises = ids.map((id) => {
//           return dispatch(fetchRecipe(id))
//         })

//         return Promise.all(fetchPromises)
//       })
//       .then((recipes) => {
//         dispatch(fetchAllRecipesSuccess(recipes))
//       })
//       .catch((error) => {
//         dispatch(fetchAllRecipesFailure(error.toString()))
//       })
//   }
// }
export const fetchAllRecipes = () => {
  return async (dispatch) => {
    dispatch(fetchAllRecipesBegin())

    try {
      const response = await fetch(`/api/allrecipesIds`)
      handleErrors(response) // Assuming handleErrors throws an error if response is not ok.
      const ids = await response.json()
      console.log(`ids: `, ids)
      const fetchPromises = ids?.map((id) =>
        dispatch(fetchRecipe(id)).catch((error) => {
          console.error(`Failed to fetch recipe with id ${id}:`, error)
          return null // Returning null or a similar placeholder for failed fetches.
        })
      )
      console.log(`fetchPromises: `, fetchPromises)
      const recipes = (await Promise.all(fetchPromises)).filter(
        (recipe) => recipe !== null
      ) // Filtering out nulls from failed fetches.

      dispatch(fetchAllRecipesSuccess(recipes))
    } catch (error) {
      dispatch(fetchAllRecipesFailure(error.toString()))
    }
  }
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}
