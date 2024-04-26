import prisma from "../Db/DbConfig.js";
import { z } from "zod";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const User= z.object({
    name:z.string().min(3).max(255),
    email : z.string().email(),
    password :z.string().min(6),
    created_at:z.string().date(), 
    updated_at:z.string().date().optional()
})



class AuthController{

    static async register(req,res){
       const payload = req.body;  
       const pasrsedResponce=User.safeParse(payload);
       if(!pasrsedResponce.success){
           return res.status(400).json({error:pasrsedResponce.error})
       }
       //check if user already exists

       const userExists= await prisma.users.findUnique({
        where:{
            email:payload.email
        }})

        if(userExists){
            return res.status(400).json("User already exists") }


       //encrypt the password
         const salt= bcrypt.genSaltSync(10);
         const hashedPassword= bcrypt.hashSync(payload.password,salt);

         const user= await prisma.users.create({
         data:{
            name:payload.name,
            email:payload.email,
            password:hashedPassword
        }
    })
    return res.status(200).json("User created successfully", user);





    }

    static async login(req,res){
        
        const body = req.body;
        const pasrsedResponce=User.safeParse(body);
        if(!pasrsedResponce.success){
            return res.status(400).json({error:pasrsedResponce.error})
        }
        const findUser = await prisma.users.findUnique({
            where: {
              email: payload.email,
            },
          });

          if(findUser){
           if(!bcrypt.compare(body.password, findUser.password)) {
                return res.status(400).json("Invalid credentials");
           }
          }else{
                return res.status(400).json("User not found");
          }

          const payload={
                id:findUser.id,
                email:findUser.email,
                name:findUser.name,
                password:findUser.password
          }

          const token= jwt.sign(payload,process.env.SECRET_KEY,{
              expiresIn:"1d"
          })
          return res.json({
            message: "Logged in",
            access_token: `Bearer ${token}`,
          });



    }
}

export default AuthController;