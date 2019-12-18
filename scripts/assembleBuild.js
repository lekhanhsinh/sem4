const fs = require("fs-extra");
const getProjectList = require("./getProjectList").default;

const FILTER = ["@types/", "@typescript-eslint/", "eslint", "typescript"];

const mainPackageJSON = {
    "name": "sem4",
    "version": "1.0.0",
    "repository": "https://github.com/lekhanhsinh/sem4.git",
    "author": "lekhanhsinhvn <38658239+lekhanhsinhvn@users.noreply.github.com>",
    "license": "MIT",
    "private": true,
    "scripts": {
        "start": "node back-end-server/index.js",
        "seed": "node back-end-database/seeders/index.js"
    },
};

const checkFilter = str => {
    for (const f of FILTER) {
        if (str.startsWith(f)) {
            return false;
        }
    }
    return true;
};

const filterDependencies = packageJSON => {
    let dependencies = [];
    for (const name of Object.keys(packageJSON.dependencies)) {
        if (checkFilter(name)) {
            dependencies = {
                ...dependencies,
                [name]: packageJSON.dependencies[name]
            };
        }
    }
    let devDependencies = [];
    for (const name of Object.keys(packageJSON.devDependencies)) {
        if (checkFilter(name)) {
            devDependencies = {
                ...devDependencies,
                [name]: packageJSON.devDependencies[name]
            };
        }
    }
    packageJSON.dependencies = dependencies;
    packageJSON.devDependencies = devDependencies;
    return packageJSON;
};

const assembleBuild = new Promise((resolve, reject) => {
    getProjectList.then(projects => {
        const packageJSONs = [];
        const promises = [];
        let _moduleAliases = {};
        for (const name of Object.keys(projects)) {
            const promise = fs.remove(`build/${name}`).then(() => {
                return Promise.all([
                    fs.copy(`${projects[name].location}/build`, `build/${name}`).then(() => {
                        console.log(`${name} build copied`);
                    }),
                    fs.readJson(`${projects[name].location}/package.json`).then(packageJSON => {
                        packageJSONs.push(filterDependencies(packageJSON));
                    })
                ]);
            });
            _moduleAliases = {
                ..._moduleAliases,
                [`@${name}`]: name,
            };
            promises.push(promise);
        }
        return Promise.all(promises).then(() => {
            mainPackageJSON["_moduleAliases"] = _moduleAliases;
            for (const packageJSON of packageJSONs) {
                mainPackageJSON.dependencies = {
                    ...mainPackageJSON.dependencies,
                    ...packageJSON.dependencies
                };
                mainPackageJSON.devDependencies = {
                    ...mainPackageJSON.devDependencies,
                    ...packageJSON.devDependencies
                };
            }
            return fs.writeJson("build/package.json", mainPackageJSON, { spaces: 4 }).then(() => {
                console.log("Generated package.json");
            }).then(() => {
                return fs.copy("public", "build/public").then(() => {
                    console.log("Copy public completed!");
                });
            });
        }).catch(err => {
            reject(err);
        });
    });
}).catch(err => {
    console.error(err);
});

exports.default = assembleBuild;