import {fetchFromTmdb} from '../services/tmdb.service.js'
export async function getTrendingMovie(req,res){
    try{
    const data = await fetchFromTmdb("https://api.themoviedb.org/3/trending/movie/day?language=en-US")
    const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)]

    res.json({success : true , contetnt : randomMovie})
    }catch (error){
  res.status(500).json({success : false , message : "Internal Server error"})
    }
}

export async function getMovieTrailers(req,res){
  try {
    const {id} = req.params 
    const data = await fetchFromTmdb(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`)
    res.json({success : true , content : data.results})
  } catch (error) {
    if(error.message.includes("404")){
      return res.status(404).send(null)
    }
   res.status(500).json({success : false , message : "Internal Server error"}) 
  }
}
export async function getMovieDetails(req,res){
  try {
    const {id}= req.params
    const data = await fetchFromTmdb(`https://api.themoviedb.org/3/movie/${id}?language=en-US`)
    res.json({success : true , content : data})
  } catch (error) {
      if(error.message.includes("404")){
      return res.status(404).send(null)
    }
   res.status(500).json({success : false , message : "Internal Server error"}) 
  }
}  
export async function getSimilarMovies(req,res){
   try {
    const {id} = req.params 
    const data = await fetchFromTmdb(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`)
    res.json({success : true , content : data.results})
  } catch (error) {
    if(error.message.includes("404")){
      return res.status(404).send(null)
    }
   res.status(500).json({success : false , message : "Internal Server error"}) 
  } 
}
export async function getMoviesByCategory(req,res){
  const {category}=req.params 
  try {
    const data = await fetchFromTmdb(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`)
    res.json({sucess : true, content : data.results})
  } catch (error) {
        if(error.message.includes("404")){
      return res.status(404).send(null)
    }
   res.status(500).json({success : false , message : "Internal Server error"}) 
  } 
  }
