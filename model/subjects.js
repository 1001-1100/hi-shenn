exports.readSubjects = function () {
    inputFile = __dirname + '/subjects.txt'
    return new Promise(function (resolve, reject) {
        arr = []
        var fs = require('fs'),
            readline = require('readline'),
            instream = fs.createReadStream(inputFile),
            outstream = new (require('stream'))(),
            rl = readline.createInterface(instream, outstream);

        rl.on('line', function (line) {
            subject = line.split(",")
            arr.push(subject)
        });

        rl.on('close', function (line) {
            /*
            console.log("FINAL " + arr)
            exports.subjects = arr
            */
            resolve(arr)
        });
    })

}

exports.writeSubjects = function (data) {
    inputFile = __dirname + '/subjects.txt'
    return new Promise(function (resolve, reject) {
        fs.writeFile(inputFile, data, function (err, data) {
            if (err) console.log(err);
            console.log("Successfully Written to File.");
        });
    })

}


//readLines(__dirname + '/subjects.txt')
//subjects = readLines(__dirname + '/subjects.txt')

/*
fs.readFile(path.normalize(__dirname + '/subjects.txt'), function (err, buf) {
    if (!err) {
        console.log(buf.toString());
        thing.push(buf.toString())
        res.send({ thing })
    } else {
        console.log(err);
    }

});
*/