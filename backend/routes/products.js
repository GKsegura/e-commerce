const express = require("express");
const router = express.Router();
const controller = require("../controllers/productsController");

router.get("/", controller.getAll);
router.get("/search", controller.search);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
