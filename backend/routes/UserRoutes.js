const { addToLikedMovies, getLikedMovies, removeFromLikedMovies } = require("../controllers/UserControllers");

const router = require("express").Router();

// Add movie
router.post("/add", addToLikedMovies);

// Get liked movies
router.get("/liked/:email", getLikedMovies);

router.delete("/delete/:email/:movieId", removeFromLikedMovies);


module.exports = router;
