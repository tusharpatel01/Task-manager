import User from "../model/user.model";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const signUp=async(req,res)=>{
    try {
        const {userName,email,password}=req.body;
        let user=User.findOne({email});
        if(user){
            return res.status(400).json({message:"user already exist"});
        }
          const salt = await bcrypt.genSalt(10);
          const hashedPassword=await bcrypt.hash(password,salt);

          user=new User({
            userName,
            email,
            password:hashedPassword
          })

          const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"1h"});
          res.json({token});
    } catch (error) {
         res.status(500).json({ msg: err.message });
        
    }

    
}


export const login=async(req,res)=>{
        try {
            const {email,password}=req.body;
            const user=User.findOne({email});
            if(!user){
                return res.status(400).json({message:"invalid credentials"});

            }
             const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
             res.json({ token });
        } catch (error) {

            res.status(500).json({ msg: err.message });
            
        }



    }