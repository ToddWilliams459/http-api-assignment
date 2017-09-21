// const fs = require('fs');

const respondXml = (request, response, status, object) => {
  // set status code and content type (application/json)
  response.writeHead(status, { 'Content-Type': 'text/xml' });
  // stringify the object (so it doesn't use references/pointers/etc)
  // but is instead a flat string object.
  // Then write it to the response.
  const xmlString = `<response><message>${object.message}</message>` + `<id>${object.id}</id></response>`;

  response.write(xmlString);
  // Send the response to the client
  response.end();
};

// function to show a success status code
const success = (request, response) => {
  // message to send
  const responseXML = {
    message: 'This is a successful response',
    id: 'Success',  
  };

  // send our json with a success status code
  respondXml(request, response, 200, responseXML);
};

// function to show a bad request without the correct parameters
const badRequest = (request, response, params) => {
  // message to send
  const responseXML = {
    message: 'This request has the required parameters',
  };

  // if the request does not contain a valid=true query parameter
  if (!params.valid || params.valid !== 'true') {
    // set our error message
    responseXML.message = 'Missing valid query parameter set to true';
    // give the error a consistent id 
    responseXML.id = 'badRequest';
    // return our json with a 400 bad request code
    return respondXml(request, response, 400, responseXML);
  }

  // if the parameter is here, send json with a success status code
  return respondXml(request, response, 200, responseXML);
};

// function to show not found error
const notFound = (request, response) => {
  // error message with a description and consistent error id
  const responseXML = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  // return our json with a 404 not found error code
  respondXml(request, response, 404, responseXML);
};


const forbidden = (request, response) => {
  // error message with a description and consistent error id
  const responseXML = {
    message: 'You do not have access to this content.',
    id: 'notFound',
  };

  // return our json with a 404 not found error code
  respondXml(request, response, 403, responseXML);
};

const unauthorized = (request, response) => {
  // error message with a description and consistent error id
  const responseXML = {
    message: 'Missing loggedIn query parameter set to yes.',
    id: 'Unauthorized',
  };

  // return our json with a 404 not found error code
  respondXml(request, response, 401, responseXML);
};

const internal = (request, response) => {
  // error message with a description and consistent error id
  const responseXML = {
    message: 'Internal Server Error.',
    id: 'internal',
  };

  // return our json with a 404 not found error code
  respondXml(request, response, 500, responseXML);
};

const notImplemented = (request, response) => {
  // error message with a description and consistent error id
  const responseXML = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  // return our json with a 404 not found error code
  respondXml(request, response, 501, responseXML);
};

module.exports = {
  success,
  badRequest,
  notFound,
  forbidden,
  unauthorized,
  internal,
  notImplemented,
};
