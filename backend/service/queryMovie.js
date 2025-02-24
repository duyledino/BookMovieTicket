import { pool } from "../config/db.js";

const queryPost = async(req,res) =>{
    const {id,original_title,poster_path} = req.body;
    const {rows} = await pool.query("insert into favouriteMovie values($1,$2,$3) returning *",[id,original_title,poster_path]);
    if(rows.length===0){
        return res.status(500).json("Internal Error");
    }
    return res.status(200).json({Message:"Add to Favourite successfully",
        movie: rows
    });
}

const queryDelete = async(req,res) =>{
    const {movieId} = req.query;
    const {rows} = await pool.query("Delete from favouriteMovie where movieid = $1 returning *",[movieId]);
    if(rows.length===0){
        return res.status(500).json("Internal Error");
    }
    return res.status(200).json({Message:"Delete Successfully",
        movie: rows
    });
}

const queryGet = async(req,res)=>{
    const {rows} = await pool.query("select * from favouriteMovie");
    if(rows.length===0){
        return res.status(200).json({Message:"No Movie Found",movie:[]});
    }
    return res.status(200).json({Message:"Get Data Successfully",
        movie: rows
    });
}

export {queryPost,queryGet,queryDelete} ;