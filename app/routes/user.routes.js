const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");

router.post("/user/register", UserController.createUser);
router.post("/user/login", UserController.loginUser);
router.post("/item/add",UserController.upload, UserController.addItem);
router.get("/item/get",UserController.getItems);
router.post("/item/details",UserController.getItemDetails);
router.post("/bid/add",UserController.addNewBid);
router.get("/bid/get",UserController.getAllBids);
module.exports = router;




/*
module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", users.create);

  // Retrieve all users
  router.get("/", users.findAll);

  // Retrieve all published users
  router.get("/published", users.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", users.findOne);

  // Update a Tutorial with id
  router.put("/:id", users.update);

  // Delete a Tutorial with id
  router.delete("/:id", users.delete);

  // Create a new Tutorial
  router.delete("/", users.deleteAll);

  app.use('/api/users', router);
};
*/