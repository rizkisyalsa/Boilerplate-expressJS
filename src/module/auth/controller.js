const router = require("express").Router()
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
const { check,validationResult } = require('express-validator/check')
const config = require('../../core/configs')
const { logger } = require("../../core/logger")
const auth = require('../../core/middleware/auth')
const FakeUser = require('../../core/models/FakeUser')
// const User = require("./repository")


// @route      GET api/auth
// @desc       get logged in user
// @access     Private
router.get('/', auth, async (req, res) => {
   try {
      const user = await FakeUser.findById(req.user.id).select('-password')
      res.json(user)
   } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
   }
})


// @route      POST api/auth
// @desc       Auth user & get token
// @access     Public
router.post('/', [
   check('username', 'Username is required').not().isEmpty(),
   check('password', 'Password is required').not().isEmpty()
], async (req,res) => {
   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      return res.status(400).json({
         errors: errors.array()
      })
   }  
   
   const { username, password } = req.body

      try {
         let user = await FakeUser.findOne({ username })
         if (!user) {
            return res.status(400).json({
               msg: 'Invalid credentials'
            })
         }
      
         const isMatch = await bcrypt.compare(password, user.password)
   
         if (!isMatch) {
            return res.status(400).json({
               msg: 'Invalid credentials'
            })
         }
         const payload = {
            user: {
               id: user.id
            }
         }

         jwt.sign(payload, config.jwt.secret, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err
            res.json({ token })
         })
      } catch (err) {
         logger.info(err.message)
         res.status(500).send('Server Error')
      }
})

module.exports = router;