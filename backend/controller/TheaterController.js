import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllTheater = async (req,res)=>{
    const allTheater = await prisma.theater.findMany({
        select:{
            theater_id:true,
            theater_name:true,
            _count:{
                select:{
                    seat: true,
                }
            }
        }
    })
    if(allTheater.length<0) return res.status(202).json({Message:"Theater not found.",allTheater:allTheater});
    return res.status(200).json({allTheater:allTheater});
}

export {getAllTheater};