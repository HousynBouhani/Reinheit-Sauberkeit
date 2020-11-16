import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import usersRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import postsRouter from "./routes/posts.js";
import photoRouter from "./routes/gallery.js";
import newsRouter from "./routes/news.js";
import imagesRouter from "./routes/images.js"
import path from "path";

const app = express();

dotenv.config();
connectDB();

app.use("/uploads", express.static("uploads"));
app.use(express.json({ extended: false }));

//define users route
app.use("/api/users", usersRouter);
//define auth route
app.use("/api/auth", authRouter);
//define posts route
app.use("/api/posts", postsRouter);
//define photos route
app.use("/api/gallery", photoRouter);
//define news route
app.use("/api/news", newsRouter);
//define news route
app.use("/api/images", imagesRouter);


const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `server is running in ${process.env.NODE_ENV} mode en port ${PORT}`
  );
});
