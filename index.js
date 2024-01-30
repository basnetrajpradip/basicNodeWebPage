const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  //Works but doesn't work if we include css files , images etc..
  /*  if (req.url === "/") {
    fs.readFile(path.join(__dirname, "public", "index.html"), (err, content) => {
      if (err) throw err;
      else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(content);
      }
    });
  } else if (req.url === "/about") {
    fs.readFile(path.join(__dirname, "public", "about.html"), (err, content) => {
      if (err) throw err;
      else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(content);
      }
    });
  } else if (req.url === "/contact-me") {
    fs.readFile(path.join(__dirname, "public", "contact-me.html"), (err, content) => {
      if (err) throw err;
      else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(content);
      }
    });
  } else {
    fs.readFile(path.join(__dirname, "public", "404.html"), (err, content) => {
      if (err) throw err;
      else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(content);
      }
    });
  } */

  //Dynamic File Path
  let filePath = path.join(__dirname, "public", req.url === "/" ? "index.html" : req.url);

  //Extension of file
  let extName = path.extname(filePath);

  //Initial content type
  let contentType = "text/html";

  switch (extName) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }

  if (contentType == "text/html" && extName == "") filePath += ".html";

  fs.readFile(filePath, (err, content) => {
    console.log(filePath);
    if (err) {
      if (err.code == "ENOENT") {
        //page not found
        fs.readFile(path.join(__dirname, "public", "404.html"), (err, content) => {
          res.writeHead(200, { "Content-Type": contentType });
          res.end(content, "utf-8");
        });
      } else {
        //some server error
        res.writeHead(500);
        res.end(`Server Error:${err.code}`);
      }
    } else {
      //success
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log("Server is Running"));
