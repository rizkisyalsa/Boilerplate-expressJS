
const registerRoute = (app) => {
  app.use("/api/auth", require("./module/auth/controller"))
  app.use("/api/users", require("./module/users/controller"))
}

module.exports = {
  registerRoute
}