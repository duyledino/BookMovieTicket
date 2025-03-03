import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const createAFilm = async(req,res)=>{
    const {film_id,film_name} = req.body;
    const film = await prisma.film.create({
        data:{
            film_id,film_name
        }
    })
    res.json({Message: "Create successfully",film: film});
}

const getAllFilm = async(req,res)=>{
    const allFilm = await prisma.film.findMany();
    if(allFilm.length === 0 )res.json({Message: "No film found."});
    res.json({allFilm: allFilm});
}

const updateAFilm = async(req,res)=>{
    const {id} = req.params;
    const {film_name,book_frequency} = req.body;
    if(!film_name || !book_frequency) res.json(400).json({Message: "Error Request"});
    const existFilm = await prisma.film.findUnique({
        where :{
            film_id: id
        }
    }) 
    if(!existFilm) res.json({Message: "Not Found"});
    const parseBook = parseInt(book_frequency);
    const updateFilm = await prisma.film.update({
        data:{
            film_name: film_name,
            book_frequency: parseBook
        },
        where: {
            film_id: existFilm.film_id
        }
    })
    res.json({Message: "Update successfully", updated: updateFilm});
}

const deleteAFilm = async(req,res)=>{
    const{id} = req.params;
    if(!await prisma.film.findUnique({
        where:{
            film_id: id
        }
    })) res.json({Message: "Film Not Found"});
    const deleted = await prisma.film.delete({where: {film_id: id}})
    res.json({Message: "Deleted successfully"});
}

export {createAFilm,getAllFilm,updateAFilm,deleteAFilm}