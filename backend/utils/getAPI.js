import axios from 'axios';

const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNGU4ODg0YmIyZmZkNzhkMzdhNTk3NTU4YzlkMDQ2YiIsIm5iZiI6MTczNzE2NTQ1NC4yMDUsInN1YiI6IjY3OGIwYThlYTkzY2U0OGJjYTQyZWZkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wqgIhdbzSLne9vF3ggLmvjKWaappmTcoBJL2NCBI1Co'
  }
};

const getAll = async()=>{
    const res = await axios.get(url,options);
    return res;
}



export default getAll;