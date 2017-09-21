const http = require('http');
const url = require('url');
const query = require('querystring');

const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');
const xmlHandler = require('./xmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3523;

const onRequest = (request, response) => {
  console.log(request.url);
  let parseUrl = url.parse(request.url);
  let queryParam = query.parse(parseUrl.query);    
    
  let apiHandler;
    // -1 if substring doesn't exist
    // # if substring does exist, where # is the starting index of the substring
  //let indexOfThing = request.headers.accept.indexOf('text/xml');
  if (request.headers.accept.indexOf('text/xml') !== -1 ) {
    apiHandler = xmlHandler;
  } else {
    apiHandler = jsonHandler;
  }
  console.log(request.headers.accept);    

  switch (parseUrl.pathname) {
    case '/':
      htmlHandler.getIndex(request, response);
      break;
    case '/style.css':
      htmlHandler.getCSS(request, response);
      break;
    case '/success':
      apiHandler.success(request, response);
      break;
    case '/badRequest':
      apiHandler.badRequest(request, response, queryParam);
      break;
    case '/unauthorized':
      apiHandler.unauthorized(request, response, queryParam);
      break;
    case '/forbidden':
      apiHandler.forbidden(request, response);
      break;
    case '/internal':
      apiHandler.internal(request, response);
      break;
    case '/notImplemented':
      apiHandler.notImplemented(request, response);
      break;
    case '/notFound':
      apiHandler.notFound(request, response);
      break;
    default:
      htmlHandler.getIndex(request, response);
      break;
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
