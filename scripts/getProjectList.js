const exec = require("child_process").exec;

const getProjectList = new Promise((resolve, reject) => {
    child = exec("yarn workspaces info --json", (err, stdout, stderr) => {
        if (err) {
            reject(err);
        } else {
            const { data } = JSON.parse(stdout);
            const projects = JSON.parse(data);
            resolve(projects);
        }
    });
});

exports.default = getProjectList;
