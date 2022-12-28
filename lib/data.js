// dependencies
const fs = require('fs')
const path = require('path')

// module scaffholding
const lib = {}

// base directory of data folder
lib.basedir = path.join(__dirname, '../.data/')

// write data to file
lib.create = (dir, file, data, callback) => {
    // open file for writing
    fs.open(`${lib.basedir + dir}/${file}.json`, 'wx', (err, fileDescriptor) => {
        if(!err && fileDescriptor) {
            // convert data to string
            const stringData = JSON.stringify(data)

            // write data to file and close
            fs.writeFile(fileDescriptor, stringData, (err2) => {
                if (!err2) {
                    fs.close(fileDescriptor, (err3) => {
                        if (!err3) {
                            callback(false);
                        } else {
                            callback('Error closing the new file!');
                        }
                    });
                } else {
                    callback('Error writing to new file!');
                }
            })
        } else {
            callback("There was an error, file may already exist")
        }
    })
};

// read data from file
lib.read = (dir, file, callback) => {
    fs.readFile(`${lib.basedir + dir}/${file}.json`, 'utf8', (err, data) => {
        callback(err, data)
    })
}

// update data from file
lib.update = (dir, file, data, callback) => {
    fs.open(`${lib.basedir + dir}/${file}.json`, 'r+', (err, fileDescriptor) => {
        if(!err && fileDescriptor){
            // convert datda to string
            const stringData = JSON.stringify(data)

            // truncate file
            fs.ftruncate(fileDescriptor, (err) => {
                if(!err) {
                    // write to file and close
                    fs.writeFile(fileDescriptor, stringData, (err) => {
                        if(!err) {
                            // close the file
                            fs.close(fileDescriptor, (err) => {
                                if(!err) {
                                    callback(false)
                                } else {
                                    callback('Error close file')
                                }
                            })
                        } else {
                            callback('Error writing file')
                        }
                    })
                } else {
                    callback('Error truncating file')
                }
            })
        } else {
            callback('Error opening file')
        }
    })
}

// delete file
lib.delete = (dir, file, callback) => {
    fs.unlink(`${lib.basedir + dir}/${file}.json`, (err) => {
        if(!err) {
            callback(false)
        } else {
            callback('Error deleting file')
        }
    })
}

// export module
module.exports = lib
