import bcrypt from "bcrypt";


export default function hashPassword(password: string, saltRounds: number) :Promise<string>{
    return new Promise((resolve:any,reject:any)=>{
        bcrypt.hash(password,saltRounds,(er:any,hash:any)=>{
            if(er)reject(er);
            resolve(hash);
        })


    })
  
}
