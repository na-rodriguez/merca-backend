const pool = require("../../config/database");

module.exports = {
  createContact: (data, callBack) => {
    pool.query(
      `insert into contact(name, celular, client) values(?,?,?)`,
      [
        data.name,
        data.celular,
        data.client
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getContacts: callBack => {
    pool.query(
      `select name, celular, client from contact`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  }
};