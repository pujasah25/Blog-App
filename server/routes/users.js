const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Post = require("../models/Post");

//UPDATE
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    // owner of user
    if (req.body.password) {
      // if we are sending password also, hashed again
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id, // my id
        {
          $set: req.body, // we can updated everything inside the body
        },
        { new: true } // to reflect the changes in the postman after updating
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can update only your account!");
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    // if its owner
    try {
      // find user first
      const user = await User.findById(req.params.id);
      try {
        // but if we delete the user but we can still see user's post
        // so delete all post of user also
        // find user, find his all post, then delete posts and this user
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id); // find by id and delete the user
        res.status(200).json("User has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User not found!");
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
});

//GET USER
router.get("/:id", async (req, res) => { // fetch this user by using this id
  try { // find the user
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc; // get all info except password
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;


