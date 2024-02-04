import { Request, Response, NextFunction } from "express"
import { RecipeModel } from "../models"
import mongoose from "mongoose"

type dbId = mongoose.Types.ObjectId

export const recipeMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id: reqQueryId } = req.params

  if (!mongoose.Types.ObjectId.isValid(reqQueryId)) {
    return res.status(400).json({ message: "Invalid ID format" })
  }

  try {
    const theId: dbId = new mongoose.Types.ObjectId(reqQueryId)
    const dbQueryResults = await RecipeModel.find({ _id: theId }).lean()

    if (dbQueryResults.length === 0) {
      return res.status(404).json({ message: "Recipe not found" })
    }

    const responseResults = dbQueryResults.map(
      ({ name, instructions, ingredients }) => ({
        name,
        instructions,
        ingredients,
      })
    )
    res.status(200).json(responseResults)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}
