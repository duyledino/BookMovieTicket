import { PrismaClient } from "@prisma/client";
import {v4 as uuid} from 'uuid'

const prisma = new PrismaClient();

const getAllCalendar = async(req,res)=>{
    const allCalendar = await prisma.calendar.findMany();
    if(allCalendar.length === 0 ) return res.json({Message: "No calendar found"});
    res.json({allCalendar: allCalendar});
}

const createACalendar = async(req,res)=>{
    const {showtime,film_id,available_sit} = req.body;
    if(!film_id) res.json({Message: "Film_id is undefined."});
    const existFilm = await prisma.film.findUnique({
        where:{film_id: film_id}
    })
    if(!existFilm) return res.json({Message: "Film doesn't exist so cannot create calendar"});
    const parseShowtime = new Date(showtime).toISOString();
    const calendar_id = uuid();
    const sit = parseInt(available_sit);
    const created = await prisma.calendar.create({
        data:{
            calendar_id: calendar_id,
            available_seat: sit,
            film_id: film_id,
            showtime: parseShowtime
        }
    })
    res.json({Message: "Create calendar successfully",Calendar: created});
}

const updateACalendar = async(req,res)=>{
    const {id} = req.params;
    const {film_id,available_sit,showtime} = req.body;
    const existCalendar = await prisma.calendar.findUnique({where:{calendar_id: id}});
    const existFilm = await prisma.film.findUnique({where:{film_id: film_id}});
    if(!existCalendar||!existFilm) return res.json({Message: "Calendar or film not found"});
    const sit = parseInt(available_sit);
    const parseShowtime = new Date(showtime).toISOString();
    const updated = await prisma.calendar.update({
        data:{
            film_id:film_id,
            available_sit: sit,
            showtime: parseShowtime
        },
        where:{
            calendar_id: id
        }
    })
    res.json({Message: "Update calendar successfully",calendar: updated});
}

const deleteACalendar = async(req,res)=>{
    const { id } = req.params;

        // 🛠️ Check if the record exists
        const existingCalendar = await prisma.calendar.findUnique({ where: { calendar_id: id } });

        if (!existingCalendar) {
            return res.status(404).json({ Message: "Calendar not found." }); // RETURN to prevent further execution
        }

        // 🛠️ Delete the record
        const deleted = await prisma.calendar.delete({ where: { calendar_id: id } });

        res.json({ Message: "Delete calendar successfully", deleted: deleted });
}

export {getAllCalendar,createACalendar,updateACalendar,deleteACalendar};