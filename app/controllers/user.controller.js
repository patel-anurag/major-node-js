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
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = path.join("", fileName);
    cb(null,  fileName.replace(/\\/g, "\\\\"));
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG/JPG images are allowed"));
  }
};

exports.upload = multer({
	storage: multer.diskStorage({
		destination: function (req, file, callback) {
			callback(null, path.join(__dirname + '../../public/uploads'));
		},
		filename: function (req, file, callback) {
			callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
		}
	}),
	fileFilter: function (req, file, callback) {
		var ext = path.extname(file.originalname);
		if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
			return callback( /*res.end('Only images are allowed')*/ null, false);
		}
		callback(null, true);
	}
}).single('image');

exports.addItem = (req, res) => {
  const { itemName, yearOfBuy, biddingPrice, description,userId } = req.body;
  const imagePath = req.file.path;
  db.items.create({
    itemName,
    yearOfBuy,
    bidPrice:biddingPrice,
    description,
    image: imagePath,
    userId
  })
    .then((item) => {
      res.status(201).json({ message: "Item added successfully", item });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    });
};

exports.getItems = (req, res) => {
  db.items
    .findAll()
    .then((items) => {
      res.status(201).json(items);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    });
}

exports.getItemDetails = (req, res) => {
  const id = req.body.id;
  db.items
    .findOne({ where: { id } })
    .then((item) => {
      res.status(201).json(item);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    });
}

exports.addNewBid = (req,res) => {
  const {bidderName,itemId,bidPrice} = req.body;
  db.bids.create({
    bidderName,
    bidPrice,
    itemId
  })
  .then((bid) => {
    res.status(201).json({ message: "Bid added successfully", bid });
  })
  .catch((error) => {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  });
}

exports.getAllBids = (req, res) => {
  db.bids
    .findAll()
    .then((items) => {
      res.status(201).json(items);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    });
}