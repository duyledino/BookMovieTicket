import { PrismaClient } from "@prisma/client";
import { unlink, readFileSync } from "fs";

const prisma = new PrismaClient();

const getAllpopcorn = async (req, res) => {
  try {
    const allpopcorn = await prisma.popcorn.findMany();
    if (allpopcorn.length === 0)
      return res.status(200).json({ Message: "Không có Bắp Nước nào !!" });
    console.log("allpopcorn[0].popcorn_image: ", allpopcorn[0].popcorn_image);
    const fixAllpopcorn = allpopcorn.map((pop) => ({
      popcorn_id: pop.popcorn_id,
      name: pop.name,
      base64Image: pop.popcorn_image_base64,
      price: Number(pop.price),
      booked: Number(pop.booked),
      total: Number(pop.total),
    }));
    return res.status(200).json({ fixAllpopcorn: fixAllpopcorn });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Message: "Interal Server Error" });
  }
};

const createAPopcorn = async (req, res) => {
  // const file = req.file;
  // console.log(file);
  // const imageBuffer = readFileSync(file.path);
  const { name, price, file } = req.body;
  console.log("name, price, file,imageBuffer:", name, price, file);
  try {
    const numberOfPopcorn = await prisma.popcorn.count();
    const popcorn_id = `POPCORN${
      numberOfPopcorn + 1 < 10
        ? `0${numberOfPopcorn + 1}`
        : `${numberOfPopcorn + 1}`
    }`;

    const existsPopcorn = await prisma.popcorn.findFirst({
      where: {
        name: name,
      },
    });
    if (existsPopcorn) {
      return res.status(400).json({ Message: "Loại bắp nước này đã tồn tại" });
    }
    const popcorn = await prisma.popcorn.create({
      data: {
        popcorn_id: popcorn_id,
        popcorn_image_base64: file,
        name: name,
        price: BigInt(price), // Ensure price is converted to BigInt
      },
    });
    // unlink(file.path, (err) => {
    //   if (err) {
    //     console.error("Error deleting file:", err);
    //     return;
    //   }
    //   console.log("File deleted successfully");
    // });
    return res.status(200).json({ Message: "Tạo loại bắp nước thành công" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Message: "Tạo loại bắp nước thất bại." });
  }
};
const deleteAPopcorn = async (req, res) => {
  const { id } = req.query; // Expecting popcorn_id in the query
  console.log("deleteAPopcorn: ", id);
  try {
    // Check if the popcorn exists
    const existPopcorn = await prisma.popcorn.findUnique({
      where: { popcorn_id: id },
    });
    console.log("deleteAPopcorn: ", existPopcorn);
    if (!existPopcorn) {
      return res.status(400).json({ Message: "Bắp nước này không tìm thấy" });
    }
    // Delete the popcorn
    const deleted = await prisma.popcorn.delete({
      where: { popcorn_id: id },
    });

    if (!deleted) {
      return res.status(400).json({ Message: "Failed to delete popcorn" });
    }

    return res.status(200).json({ Message: "Delete successfully" });
  } catch (error) {
    console.error("Error deleting popcorn:", error);
    return res.status(500).json({ Message: "Internal Server Error" });
  }
};

export { getAllpopcorn, createAPopcorn, deleteAPopcorn };
