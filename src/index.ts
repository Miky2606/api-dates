import express from "express";
import cors from "cors";
import "dotenv/config";
import router from "./routes";

const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.use(router);

app.listen(PORT, () => {
  console.log(PORT);
});
