const Entries = require("../models/Entries")
const Users = require("../models/Users")

Entries.Create()
  .then(() => Users.Create())
  .catch((err) => console.log(err))
  .finally(() => console.log("done"))
