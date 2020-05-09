const { c, cpp, node, python, java } = require('compile-run'); // This is the main package to compile the code
const bodyparser = require("body-parser"); // A middle ware
const express = require('express'); // used for routing purposes and a similar middle-ware
const app = express();

app.use(bodyparser.urlencoded({ extended: true })); // we need this to get data to be available in req.body

app.get('/', (req, res) => { // main page
  res.sendFile(__dirname + "/index.html");
});

app.post('/output', (req, res) => {
  var sourcecode = req.body.code;
  var lang = req.body.lang;
  var radio = req.body.inputRadio;
  var input = req.body.input;
  //For Python
  if (lang === "Python") { 
    if (radio === "false") {
      let resultPromise = python.runSource(sourcecode);
      resultPromise
        .then(result => {
          res.send(result.stdout);
        })
        .catch(err => {
          res.send(err);
        });
    }
    else {
      python.runSource(sourcecode, { stdin: input }, (err, result) => {
        if (err) {
          res.send(err);
        }
        else {
          res.send(result.stdout);
        }
      });
    }
  }
  //For C++
  else if (lang === "C++") {
    if (radio === "false") {
      let resultPromise = cpp.runSource(sourcecode);
      resultPromise
        .then(result => {
          res.send(result.stdout);
        })
        .catch(err => {
          res.send(err);
        });
    }
    else {
      cpp.runSource(sourcecode, { stdin: input }, (err, result) => {
        if (err) {
          res.send(err);
        }
        else {
          res.send(result.stdout);
        }
      });
    }
  }
  //For  Node JS
  else if (lang === "Node JS") {
    if (radio === "false") {
      let resultPromise = node.runSource(sourcecode);
      resultPromise
        .then(result => {
          res.send(result);
        })
        .catch(err => {
          res.send(err);
        });
    }
    else {
      node.runSource(sourcecode, { stdin: input }, (err, result) => {
        if (err) {
          res.send(err);
        }
        else {
          res.send(result);
        }
      });
    }
  }
  //For C
  else if (lang === "C") {
    if (radio === "false") {
      let resultPromise = c.runSource(sourcecode);
      resultPromise
        .then(result => {
          res.send(result);
        })
        .catch(err => {
          res.send(err);
        });
    }
    else {
      c.runSource(sourcecode, { stdin: input }, (err, result) => {
        if (err) {
          res.send(err);
        }
        else {
          res.send(result);
        }
      });
    }
  }
  //For Java
  if (lang === "Java") {
    if (radio === "false") {
      let resultPromise = java.runSource(sourcecode);
      resultPromise
        .then(result => {
          res.send(result);
        })
        .catch(err => {
          res.send(err);
        });
    }
    else {
      java.runSource(sourcecode, { stdin: input }, (err, result) => {
        if (err) {
          res.send(err);
        }
        else {
          res.send(result);
        }
      });
    }
  }

});

//port
const port = process.env.port || 3000;
app.listen(port, () => console.log(`listening to ${port}`));
