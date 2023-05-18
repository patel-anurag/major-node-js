const db = require("../models/index");

const multer = require("multer");
const path = require("path");

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      phone,
      address,
      pan,
      city,
      state,
    } = req.body;
    const user = await db.users.create({
      firstname,
      lastname,
      email,
      password,
      phone,
      address,
      pan,
      city,
      state,
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.users.findOne({ where: { email } });
    if (!user) {
      return res.status(202).json({ message: "User not found" });
    }

    // Compare the provided password with the stored hashed password
    let passwordMatch = false;
    if (password === user.password) passwordMatch = true;
    if (!passwordMatch) {
      return res.status(202).json({ message: "Invalid password" });
    }

    return res.status(201).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG/JPG images are allowed"));
  }
};

exports.upload = multer({ storage, fileFilter }).single("image");

exports.addItem = (req, res) => {
  const { itemName, yearOfBuy, biddingPrice, description } = req.body;
  const imagePath = req.file.path;
  db.items.create({
    itemName,
    yearOfBuy,
    biddingPrice,
    description,
    image: imagePath,
  })
    .then((item) => {
      res.status(201).json({ message: "Item added successfully", item });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    });
};
