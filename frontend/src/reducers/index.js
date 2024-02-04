import { combineReducers } from "redux"
import search from "./search"
import recipe from "./recipe"
import allRecipeIds from "./allRecipeIds"

export default combineReducers({ search, recipe, allRecipeIds })
