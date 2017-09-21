const fs = require('fs');

const respondXml = (request, response, status, object) => {
      //set status code and content type (application/json)
  response.writeHead(status, { 'Content-Type': 'text/xml' });
  //stringify the object (so it doesn't use references/pointers/etc)
  //but is instead a flat string object.
  //Then write it to the response.
  const xmlString = "<response><message>" + object["message"] + "</message>" + "<id>" + object["id"] + "</id></response>"
    
  response.write(xmlString);
  //Send the response to the client
  response.end();    
};

//function to show a success status code
const success = (request, response) => {
  //message to send
  const responseJSON = {
    message: 'This is a successful response',
  };

  //send our json with a success status code
  respondXml(request, response, 200, responseJSON);
};

//function to show a bad request without the correct parameters
const badRequest = (request, response, params) => {
  //message to send
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  //if the request does not contain a valid=true query parameter
  if(!params.valid || params.valid !== 'true') {
    //set our error message
    responseJSON.message = 'Missing valid query parameter set to true';
    //give the error a consistent id 
    responseJSON.id = 'badRequest';
    //return our json with a 400 bad request code
    return respondJSON(request, response, 400, responseJSON);
  }

  //if the parameter is here, send json with a success status code
  return respondXml(request, response, 200, responseJSON);
};

//function to show not found error
const notFound = (request, response) => {
  //error message with a description and consistent error id
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  //return our json with a 404 not found error code
  respondXml(request, response, 404, responseJSON);
};

module.exports = {
    success,
    badRequest,
    notFound
};