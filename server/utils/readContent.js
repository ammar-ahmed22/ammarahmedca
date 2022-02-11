const { readFileSync } = require("fs");
const fs = require("fs");

const readContent = ( file ) => {
    return readFileSync(file).toString("utf-8")
}

module.exports = readContent