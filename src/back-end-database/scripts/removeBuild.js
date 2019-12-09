const path = require("path");
const fs = require("fs-extra");

const removeBuild = new Promise((resolve, reject) => {
    fs.remove(path.resolve("build")).then(() => {
        console.log("Removed build.");
    });
});

module.exports = removeBuild;