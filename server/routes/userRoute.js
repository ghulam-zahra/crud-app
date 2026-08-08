import express from "express";
import { create , gettAll, getById , updateById ,deleteById} from "../controllers/userController.js";

const route = express.Router();

route.post("/create", create);
route.get("/getall", gettAll);
route.get("/getbyid/:id", getById);
route.put("/updatebyid/:id", updateById);
route.delete("/deletebyid/:id", deleteById);
export default route;