import { RecipeModel, Ingredient } from "../models"
import { Request, Response } from "express"

const allIngredients = ["flour", "sugar", "salt", "butter", "milk"]

const escapeRegex = (text): string => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
}

interface Query {
  name?: RegExp
  "ingredients.name"?: any // Adjusted for MongoDB query structure
}

const recipeCleaner = (recipe): { id: string; name: string } => {
  const { _id, name } = recipe // Changed id to _id to match MongoDB's default
  return { id: _id.toString(), name } // Convert _id to string
}

export const searchMiddleware = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, ingredients } = req.body

    if (!name && (!ingredients || ingredients.length === 0)) {
      res.status(400).json({ message: "No search parameters provided." })
      return
    }

    const query: Query = {}
    if (name) {
      query.name = new RegExp(escapeRegex(name), "gi")
    }
    if (ingredients) {
      const whatsLeft = allIngredients.filter(
        (ing) => !ingredients.includes(ing)
      )
      query["ingredients.name"] = { $nin: whatsLeft }
    }

    const foundRecipes = await RecipeModel.find(query)
    const builtRecipes = foundRecipes.map(recipeCleaner)
    res.status(200).json(builtRecipes)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" })
  }
}
