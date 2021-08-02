const Entries = require("../models/Entries")
const Users = require("../models/Users")

Users.Create()
  .then(() => Entries.Create())
  .catch((err) => console.log(err))
  .finally(() => console.log("done"))
