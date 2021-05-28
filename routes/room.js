const express = require("express");
const roomRouter = express.Router();
const RoomController = require("../controllers/roomController");

roomRouter.get("/rooms", RoomController.findRooms);
roomRouter.get("/rooms/:id", RoomController.getRoomById);
roomRouter.put("/rooms/:id", RoomController.updateRoom);
roomRouter.patch("/rooms/:id", RoomController.updateStatus);
roomRouter.delete("/rooms/:id", RoomController.deleteRoom);


module.exports = roomRouter;