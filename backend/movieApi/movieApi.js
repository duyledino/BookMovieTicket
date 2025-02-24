import axios from "axios";

const movieApi = async (req, res) => {
  const page = req.query.page;
  const url =
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
  const options = {
    method: "GET",
    url: url,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.APIKEY}`,
    },
  };
  try {
    const response = await axios.request(options);
    // Send only the data part of the response to avoid circular references
    return res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetching data",error:error });
  }
};

export default movieApi;
