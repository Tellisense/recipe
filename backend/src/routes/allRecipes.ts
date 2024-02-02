import { Request, Response, NextFunction } from "express"
import { RecipeModel } from "../models"
import * as mongoose from "mongoose"

type dbId = mongoose.Types.ObjectId

export const allRecipesMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let responseResults: dbId[] = []

  try {
    const dbQueryResults = await RecipeModel.find({})
    responseResults = dbQueryResults.map((item) => item._id)
  } catch {}

  res.json(responseResults)
}
