const fs = require('fs');
const mime = require('mime');
const path = require('path')

const send404 = res => {
  res.writeHead(404, {'Content-Type': 'text-plain'});
  res.write('Error 404');
  res.end()
}

const sendFile = (res, absPath, file) => {
  res.writeHead(200, {'content-type': mime.lookup(path.basename(absPath))})
  res.end(file);
}
const serveStatic = (res, cache, absPath) => {
  if(cache[absPath]) {
    sendFile(res, absPath, cache[absPath]) 
  } else {
    fs.exists(absPath, (exists) => {
      if (exists) {
        fs.readFile(absPath, (err, data) => {
          if (err) send404(res)
          cache[absPath] = data
          sendFile(res, absPath, cache[absPath])
        })
      }
      else {
        send404(res);
      }
    })
  }
  return null;
}

module.exports = serveStatic