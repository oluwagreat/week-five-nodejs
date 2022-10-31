const http = require('http');
const path = require('path');
const fs = require('fs');
//create a server

const server = http.createServer((request,response) =>{
 //   let filePath = path.join(__dirname,request.url === '/home' ? 'index.html':request.url)
 let filePath = path.join(__dirname,request.url);
 if (request.url === '/' || request.url === '/home') {
    filePath = path.join(__dirname,'index.html')
 } 
 if(request.url ==='/about'){
 filePath = path.join(__dirname, "about.html");
 }
 if (request.url === "/contact") {
   filePath = path.join(__dirname, "contact.html");
 }
 
    let contentType = getContentType(filePath) || 'text/html'
    let emptyPagePath = path.join(__dirname,'404.html')
    fs.readFile(filePath,'utf8',(err,content) =>{
        if(err){
            if(err.code === 'ENOENT'){
                fs.readFile(emptyPagePath,'utf8',(err,content) =>{
                    response.writeHead(200,{'Content-Type':contentType})
                    response.end(content)
                })
            }else{
                response.writeHead(500)
                response.end(`An error occured`)
            }

        }else{ //No error
            response.writeHead(200,{'Content-Type':contentType})
            response.end(content)

        }
    })
    
});

const getContentType = (filePath) =>{
    let extensionName = path.extname(filePath)
    if(extensionName === '.js'){
        return 'text/javascript'
    }
     if (extensionName === ".css") {
       return "text/css";
     }
      
}


const port = 4000
//create a port
server.listen(port,() =>{
    console.log(`Server started on port ${port}`);
});
