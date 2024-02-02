import { Request, Response, NextFunction } from "express"
import { RecipeModel } from "../models"
import * as mongoose from "mongoose"

type dbId = mongoose.Types.ObjectId
interface IdbQuery {_id?: dbId}

export const recipeMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const reqQueryId:string = req?.params?.id
  let dbQuery:IdbQuery  = {}
  let responseResults: dbId[] = []

  try {
    const theId: dbId= mongoose.Types.ObjectId(reqQueryId);
    dbQuery["_id"] = theId

    const dbQueryResults = await RecipeModel.find(dbQuery)
    responseResults = dbQueryResults.map(item => {
      const { name, instructions, ingredients } = item
      return { name, instructions, ingredients }
    })
  } catch {}

  res.json(responseResults)
}
