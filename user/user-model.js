const db = require("../data/config");

function get() {
  return db("users");
}

function getByUsername(filter) {
  return db("users").where(filter);
}

async function add(user) {
  const [id] = await db("users").insert(user, "id");

  return { ...user, id: id };
}

module.exports = {
  get,
  add,
  getByUsername,
};
