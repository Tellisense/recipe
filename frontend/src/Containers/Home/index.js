import React, { useState, useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HomeWrapper } from "./styles"
import Input from "@material-ui/core/Input"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Divider from "@material-ui/core/Divider"
import Button from "@material-ui/core/Button"
import LinearProgress from "@material-ui/core/LinearProgress"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import * as actions from "../../actions"
import { fetchAllRecipes } from "../../actions/allRecipeIds"
const ingredientList = ["flour", "sugar", "salt", "butter", "milk"]

const Home = () => {
  const [term, setTerm] = useState("")
  const [ingredients, setIngredients] = useState(["milk"])
  const [data, setData] = useState([])

  const dispatch = useDispatch()
  // const { recipes, isLoading } = useSelector((state) => state.search)

  const recipes = useSelector((state) => state.allRecipeIds.ids) // Adjust based on how your state is structured
  console.log(`data: `, data)
  useEffect(() => {
    setData(dispatch(fetchAllRecipes()))
  }, [dispatch])

  // useEffect(() => {
  //   console.log(`allRecipes: `, recipes)
  // }, [recipes])

  const handleSearch = useCallback((event) => {
    setTerm(event.target.value)
  }, [])

  const handleIngredient = useCallback((ingredient, event) => {
    setIngredients((currentIngredients) => {
      if (event.target.checked) {
        return [...currentIngredients, ingredient]
      } else {
        return currentIngredients.filter((item) => item !== ingredient)
      }
    })
  }, [])

  const fetchSearch = useCallback(() => {
    // Dispatch an action to search recipes
    // You need to define this action in your Redux actions file
    dispatch(actions.getSearch({ term, ingredients }))
  }, [dispatch, term, ingredients])

  return (
    <HomeWrapper>
      <Input
        autoFocus={true}
        fullWidth={true}
        onChange={handleSearch}
        value={term}
      />
      <div>
        <h3>Ingredients on hand</h3>
        {ingredientList.map((ingredient) => (
          <FormControlLabel
            key={ingredient}
            control={
              <Checkbox
                checked={ingredients.includes(ingredient)}
                onChange={(event) => handleIngredient(ingredient, event)}
                value={ingredient}
              />
            }
            label={ingredient}
          />
        ))}
      </div>
      <Button onClick={fetchSearch}>search</Button>
      <Divider />
      {/* {recipes && (
        <List>
          {recipes.map((recipe) => (
            <ListItem key={recipe.id}>
              <ListItemText primary={recipe.name} />
            </ListItem>
          ))}
        </List>
      )} */}
      {/* {isLoading && <LinearProgress />} */}
      <Divider />
      {/* TODO: Add the recipe component here, similar to the class component's TODO */}
    </HomeWrapper>
  )
}

export default Home
