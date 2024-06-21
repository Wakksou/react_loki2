"use strict";

const validateUser = (userName, password, callback) => {
    if (!userName || !password) {
        callback("Missing user/password", null);
    } else if (userName === "syaob" && password === "161100")  {
        callback(null, "syaob");
    } else {
        callback("Not valid user", null);
    }
};
module.exports = validateUser