import * as Styles from "./Card.styles"

export const Card = ({ recipe }) => {
  return (
    <Styles.CardContainer>
      <Styles.CardTitle>{recipe.name}</Styles.CardTitle>
      <Styles.Instructions>{recipe.instructions}</Styles.Instructions>
      <Styles.IngredientList>
        {recipe.ingredients.map((ingredient) => (
          <Styles.Ingredient key={ingredient._id}>
            {ingredient.amount} {ingredient.unit} {ingredient.name}
          </Styles.Ingredient>
        ))}
      </Styles.IngredientList>
    </Styles.CardContainer>
  )
}
