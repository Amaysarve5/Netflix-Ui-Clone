const User = require("../models/UserModel");

module.exports.addToLikedMovies = async (req, res) => {
  try {
    const { email, data } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      const { likedMovies } = user;

      // FIXED: Correct comparison operator ===
      const movieAlreadyLiked = likedMovies.find(
        ({ id }) => id === data.id
      );

      if (!movieAlreadyLiked) {
        await User.findByIdAndUpdate(
          user._id,
          {
            likedMovies: [...likedMovies, data],
          },
          { new: true } // FIXED: missing comma earlier
        );
      } else {
        return res.json({ msg: "Movie already added to the liked list" });
      }
    } else {
      await User.create({ email, likedMovies: [data] });
    }

    return res.json({ msg: "Movie added successfully" });
  } catch (error) {
    console.error(error);
    return res.json({ msg: "Error adding movie" });
  }
};

module.exports.getLikedMovies = async(req, res)=>{
    try{
        const {email} = req.params;
        const user = await User.findOne({email});
        if(user){
            res.json({msg: "sucess", movies: user.likedMovies});
        }else return res.json({msg: "user with given email not found"})
    }catch(err){
        return res.json({msg: "Error fetching movie"})
    }
}
 

module.exports.removeFromLikedMovies = async (req, res) => {
  try {
    const { email, movieId } = req.params;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found", movies: [] });
    }

    const movieIndex = user.likedMovies.findIndex(
      (movie) => movie.id === Number(movieId)
    );

    if (movieIndex === -1) {
      return res.status(400).json({ msg: "Movie not found", movies: user.likedMovies });
    }

    user.likedMovies.splice(movieIndex, 1);
    await user.save();

    return res.json({
      msg: "Movie Deleted",
      movies: user.likedMovies,
    });
  } catch (err) {
    return res.status(500).json({ msg: "Error deleting movie" });
  }
};
