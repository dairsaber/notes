const fs = require("fs");
const path = require("path");

const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function (error, data) {
      if (error) return reject(error);
      resolve(data);
    });
  });
};

function read2Files() {
  let genFunc;
  const gen = function* () {
    const f1 = yield readFile(path.resolve(__dirname, "./assets/text.txt"));
    genFunc.next();
    const f2 = yield readFile(path.resolve(__dirname, "./assets/text2.txt")).then(genFunc.next);
    genFunc.next();

    console.log(f1.toString());
    console.log(f2.toString());
    return 111;
  };
  genFunc = gen();
  genFunc.next();
}

read2Files();

let count = 0;
setInterval(() => {
  console.log(`count`, ++count);
}, 1000);
