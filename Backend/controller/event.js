const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler=require("../utils/ErrorHandler");
const {upload}=require("../multer");
const {isSeller}=require("../middleware/auth"); 
const Shop = require("../models/shop");
const Event = require("../models/event");

router.post(
  "/create-event",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);

      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid!", 400));
      }

      const files = req.files;
      // multer me filename hota hai, fileName nahi
      const imageUrls = files.map((file) => file.path); // ya file.filename bhi le sakta hai

      const eventData = {
        ...req.body,
        images: imageUrls,
        shop: shop, // pura object save hoga
      };

      console.log("🟢 event Data:", eventData);

      const product = await Event.create(eventData);

      res.status(201).json({
        success: true,
        product,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);



router.get("/get-all-events", async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});


router.delete(
  "/delete-shop-event/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try { 
      const productId = req.params.id; // 👉 URL se product ka id uthaya

      const event = await Event.findByIdAndDelete(productId); // 👉 product ko DB se delete kia

      if (!event) {
        return next(new ErrorHandler("EVent is not found with this id", 404)); 
        // 👉 Agar product exist hi nahi karta to error throw karo
      }

      res.status(201).json({
        success: true,
        message: "Event Deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400)); // 👉 agar koi error aaye to middleware me bhej do
    }
  })
);




module.exports = router;