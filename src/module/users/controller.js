const router = require("express").Router()
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
const { check,validationResult } = require('express-validator/check')
const config = require('../../core/configs')
const { logger } = require("../../core/logger")
const FakeUser = require('../../core/models/FakeUser')

// @route      POST api/users
// @desc       Register a user
// @access     Public
router.post('/', [
   check('name', 'please add name').not().isEmpty(),
   check('username', 'Please add username').not().isEmpty(),
   check('password', 'please enter a password with 4 or more character').isLength({
      min: 4
   })
], async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({
         errors: errors.array()
      })
   }

   const { name, username, password } = req.body

   try {
      let user = await FakeUser.findOne({ username })

      if (user) {
         return res.status(400).json({
            msg: "User already exists"
         })
      }

      user = new FakeUser({ name, username, password })

      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)

      user.save()
      res.json(user)

   } catch (err) {
      logger.info(err.message)
      res.status(500).send('Server Error')
   }
})

module.exports = router;