module.exports = {
  HOST: "cloud-prashant.cgvxyx0unkbk.us-east-1.rds.amazonaws.com",
  USER: "admin",
  PASSWORD: "admin123",
  DB: "watches4you",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
