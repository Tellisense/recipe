import {
  SEARCH_RECIPES_BEGIN,
  SEARCH_RECIPES_SUCCESS,
  SEARCH_RECIPES_FAILURE,
} from "./types"

export const getSearch = () => ({
  type: SEARCH_RECIPES_BEGIN,
})

export const receiveSearch = (results) => ({
  type: SEARCH_RECIPES_SUCCESS,
  payload: results,
})

export const failSearch = (error) => ({
  type: SEARCH_RECIPES_FAILURE,
  payload: error,
})

export const performSearch = (query) => {
  return (dispatch) => {
    dispatch(getSearch())
    return fetch(`/api/search?query=${encodeURIComponent(query)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        return response.json()
      })
      .then((data) => {
        dispatch(receiveSearch(data))
      })
      .catch((error) => {
        dispatch(failSearch(error.toString()))
      })
  }
}
