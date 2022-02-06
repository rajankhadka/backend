const fs = require('fs');

exports.readDir = (path,excludefileName) => {
    return new Promise((resolve,reject) =>{
        const dir = [];
        fs.readdir(path,(error,files) =>{
            if(error) return reject(error);
            for (const file of files) {
                if(file === excludefileName) continue;
                dir.push(file);
            }
            return resolve(dir);
        });
    });
}

exports.readDirSync = (path,excludefileName) =>{
    const dir = [];
    const files = fs.readdirSync(path);
    for (const file of files) {
        if(file === excludefileName) continue;
        dir.push(file);
    }
    return dir;
}


