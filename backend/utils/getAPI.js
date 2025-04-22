import axios from "axios";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNGU4ODg0YmIyZmZkNzhkMzdhNTk3NTU4YzlkMDQ2YiIsIm5iZiI6MTczNzE2NTQ1NC4yMDUsInN1YiI6IjY3OGIwYThlYTkzY2U0OGJjYTQyZWZkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wqgIhdbzSLne9vF3ggLmvjKWaappmTcoBJL2NCBI1Co",
  },
};

const getAll = async (page) => {
  const urlAll =
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
  const res = await axios.get(urlAll, options);
  return res;
};

const getDetail = async (id) => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    options
  );
  return res;
};

export { getAll, getDetail };
