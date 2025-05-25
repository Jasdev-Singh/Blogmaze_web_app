import express from "express"
import postroutes from "./routes/posts.js"
import authroutes from "./routes/auth.js"
import userroutes from "./routes/users.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import multer from "multer";

import fs from "fs";

import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app =express()
const frontendurl="https://blogmaze-site.up.railway.app";

app.use(express.json())
app.use(cors());
app.use(cookieParser())
app.use(cors({origin : frontendurl}));

/*
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname)
  }
})

const upload = multer({ storage })

app.post('/api/upload', upload.single('file'), function (req, res) {
    const file=req.file;
    res.status(200).json(file.filename)

}
)*/

const uploadPath = path.join(__dirname, "./uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}


// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage });

// File upload route
app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json("No file uploaded");

  const fileUrl = `http://localhost:8800/uploads/${file.filename}`;
  res.status(200).json({ filename: file.filename, url: fileUrl });
});


// Serve uploads statically

app.use("/uploads", express.static(uploadPath));
app.use("/api/auth",authroutes)
app.use("/api/posts",postroutes)
app.use("/api/users",userroutes)

app.listen(8800,()=>{
    console.log("connected");
})
