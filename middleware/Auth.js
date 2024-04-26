
import prisma from "../Db/DbConfig"
import jwt from "jsonwebtoken"

export const verifyJwt=async(req,res,next)=>{

  try {
      const token=req.cookies?.accessToken ||req.headers("Authorization").replace("Bearer ","")
  
  
      if(!token){
          res.status(400).json("No token found")
      }
  
      
        const decodedToken=jwt.verify(token,process.env.SECRET_KEYT)

        if(!decodedToken){
           res.status(400).json("Invalid Access-Token")
        }
  
      
  
        const user=await prisma.users.findUnique({
            where:{
                id:decodedToken.id
            }})
      if(!user){
          res.status(400).json("User not found")
      }
      req.user=user;
      next();
  } catch (error) {
    throw new ApiError(400,"Invalid Access-Token")
  }
}
