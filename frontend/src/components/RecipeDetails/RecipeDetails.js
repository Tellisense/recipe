import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchRecipe } from "../../store/actions"
import * as Styles from "./RecipeDetails.styles"

export const RecipeDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const recipe = useSelector((state) => state.recipe.data)

  useEffect(() => {
    dispatch(fetchRecipe(id))
  }, [dispatch, id])

  return (
    <Styles.Container>
      <Styles.Title>{recipe.name}</Styles.Title>
      <Styles.Instructions>{recipe.instructions}</Styles.Instructions>
      <h3>Ingredients:</h3>
      <Styles.IngredientList>
        {recipe.ingredients &&
          recipe.ingredients.map((ingredient) => (
            <Styles.IngredientItem key={ingredient._id}>
              {`${ingredient.amount} ${ingredient.unit} of ${ingredient.name}`}
            </Styles.IngredientItem>
          ))}
      </Styles.IngredientList>
    </Styles.Container>
  )
}
