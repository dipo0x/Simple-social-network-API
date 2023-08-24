import { Response } from "express";

function apiErrorHandler(code: number, message: string, res: Response,) {
  try{
    return res.status(code).json({
      status: code, 
      success: false, 
      message: message 
    })
  } 
  catch(err){
    console.log(err);
    return res.status(500).send({ 
      status: 500, 
      success: false,
      message: 'Something went wrong' 
    });
  }
}
export default apiErrorHandler;