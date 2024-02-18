const express= require("express");
const router=express.Router();
const itemsController = require('../controllers/items');



router.post("/add-items",itemsController.addItem)

router.get("/get-items",itemsController.getItem)

router.put("/edit-items/:id",itemsController.editItem)

router.delete("/delete-item/:id",itemsController.deleteItem)

module.exports = router;