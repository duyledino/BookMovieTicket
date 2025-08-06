import { PrismaClient } from "@prisma/client";
import { json } from "express";

const prisma = new PrismaClient();

const getAllTheater = async (req, res) => {
  try {
    const allTheater = await prisma.theater.findMany({
      select: {
        theater_id: true,
        theater_name: true,
        number_of_seat: true,
        _count:{
          select:{
            seat: true
          }
        }
      },
    });
    if (allTheater.length < 0)
      return res
        .status(400)
        .json({ Message: "Theater not found.", allTheater: allTheater });
    return res.status(200).json({ allTheater: allTheater });
  } catch (error) {
    return res
      .status(400)
      .json({ Message: "Cõ lỗi khi thực hiện lấy phòng chiếu." });
  }
};

const createATheater = async (req, res) => {
  const { theater_name, theater_type } = req.body;
  console.log("theater_name, theater_type:",theater_name, theater_type);
  try {
    const number_of_theater = await prisma.theater.count();
    const theater_id = `${theater_type !== "VIP" ? "" : "VIP"}THEATER${
      number_of_theater + 1 < 10
        ? `0${number_of_theater + 1}`
        : `${number_of_theater + 1}`
    }`;
    const existsTheater = await prisma.theater.findFirst({
      where: {
        theater_name: theater_name,
      },
    });
    if (existsTheater) {
      return res.status(400).json({ Message: "Phòng phim này đã tồn tại" });
    }
    const theater = await prisma.theater.create({
      data: {
        theater_id: theater_id,
        theater_name: theater_name,
      },
    });
    return res.status(200).json({ Message: "Tạo phòng chiếu thành công" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ Message: "Tạo phòng chiếu thất bại." });
  }
};

const deleteATheater = async (req, res) => {
  const { id } = req.query; // Expecting theater_id in the query
  console.log("deleteATheater: ",id);

  try {
    // Check if the theater exists
    const existTheater = await prisma.theater.findUnique({
      where: { theater_id: id },
    });
    console.log("deleteATheater: ",existTheater);
    if (!existTheater) {
      return res.status(400).json({ Message: "Theater not found" });
    }

    // Delete the theater
    const deleted = await prisma.theater.delete({
      where: { theater_id: id },
    });

    if (!deleted) {
      return res.status(400).json({ Message: "Failed to delete theater" });
    }

    return res.status(200).json({ Message: "Delete successfully" });
  } catch (error) {
    console.error("Error deleting theater:", error);
    return res.status(400).json({ Message: "Internal Server Error" });
  }
};


export { getAllTheater, createATheater,deleteATheater };
