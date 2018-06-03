module.exports = {
  secret: process.env.SECRET,
  database: process.env.MONGO_DB,
  port: process.env.PORT || 2002
};
