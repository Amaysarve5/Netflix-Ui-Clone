import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TMBD_BASE_URL, API_KEY } from "../utils/constants";
import axios from "axios";

const initialState = {
    movies: [],
    genresLoaded: false,
    genres: [],
};

// ------------------ GET GENRES ------------------ //
export const getGenres = createAsyncThunk("netflix/genres", async () => {
    const {
        data: { genres },
    } = await axios.get(`${TMBD_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    return genres;
});

// ------------------ CREATE ARRAY ------------------ //
const createArrayFromRawData = (array, moviesArray, genres) => {
    array.forEach((movie) => {
        const movieGenres = [];

        movie.genre_ids?.forEach((genreId) => {
            const matchedGenre = genres.find(({ id }) => id === genreId);
            if (matchedGenre) movieGenres.push(matchedGenre.name);
        });

        if (movie.backdrop_path) {
            moviesArray.push({
                id: movie.id,
                name: movie?.original_name
                    ? movie.original_name
                    : movie.original_title,
                image: movie.backdrop_path,
                genres: movieGenres.slice(0, 3),
            });
        }
    });
};

// ------------------ FETCH RAW DATA ------------------ //
const getRawData = async (api, genres, paging) => {
    const moviesArray = [];
    for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
        const { data } = await axios.get(
            `${api}${paging ? `&page=${i}` : ""}`
        );

        createArrayFromRawData(data.results, moviesArray, genres);
    }
    return moviesArray;
};

// ------------------ FETCH MOVIES ------------------ //
export const fetchMovies = createAsyncThunk(
    "netflix/trending",
    async ({ type }, thunkApi) => {
        const { netflix } = thunkApi.getState();

        const data = await getRawData(
            `${TMBD_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
            netflix.genres,
            true
        );

        console.log(data);
        return data;
    }
);

export const fetchDataByGenre = createAsyncThunk(
    "netflix/moviesByGenres",
    async ({ genre, type }, thunkApi) => {
        const { netflix } = thunkApi.getState();

        const data = await getRawData(
            `${TMBD_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,
            netflix.genres,
        );

        console.log(data);
        return data; 
    }
);

// ------------------ LIKED MOVIES ------------------ //
export const getUserLikedMovies = createAsyncThunk("netflix/getLiked", async (email) => {
    const { data: { movies },
} = await axios.get(`http://localhost:5000/api/user/liked/${email}`);
    return movies;
})

// ------------------ DELETE LIKED MOVIES ------------------ //
export const removeFromLikedMovies = createAsyncThunk(
  "netflix/deleteLiked",
  async ({ email, movieId }) => {
    const {
      data: { movies },
    } = await axios.delete(
      `http://localhost:5000/api/user/delete/${email}/${movieId}`
    );
    return movies;
  }
);



// ------------------ SLICE ------------------ //
const NetflixSlice = createSlice({
    name: "netflix",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getGenres.fulfilled, (state, action) => {
            state.genres = action.payload;
            state.genresLoaded = true;
        });
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
        });
        builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
            state.movies = action.payload;
        });
        builder.addCase(getUserLikedMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
        });
        builder.addCase(removeFromLikedMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
        });
    },
});

// ------------------ STORE ------------------ //
export const store = configureStore({
    reducer: {
        netflix: NetflixSlice.reducer,
    },
});
