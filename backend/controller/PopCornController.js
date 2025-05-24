import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

const getAllPopCorn = async(req,res)=>{
    const allPopCorn = await prisma.popCorn.findMany();
    if(allPopCorn.length===0) return res.status(200).json({Message: "No popcorn found"});
    const fixAllPopCorn = allPopCorn.map(pop=>({
        popCorn_id: pop.popCorn_id,
        name: pop.name,
        price : Number(pop.price),
        booked: Number(pop.booked),
        total: Number(pop.total)
    }))
    return res.status(200).json({fixAllPopCorn:fixAllPopCorn});
}

export {getAllPopCorn}