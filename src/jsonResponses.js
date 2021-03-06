const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });

  response.write(JSON.stringify(object));

  response.end();
};


// function to show a success status code
const success = (request, response) => {
  // message to send
  const responseJSON = {
    message: 'This is a successful response',
  };

  // send our json with a success status code
  respondJSON(request, response, 200, responseJSON);
};

// function to show a bad request without the correct parameters
const badRequest = (request, response, params) => {
  // message to send
   // console.log(a.b.c.d);
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  // if the request does not contain a valid=true query parameter
  if (!params.valid || params.valid !== 'true') {
    // set our error message
    responseJSON.message = 'Missing valid query parameter set to true';
    // give the error a consistent id 
    responseJSON.id = 'badRequest';
    // return our json with a 400 bad request code
    return respondJSON(request, response, 400, responseJSON);
  }

  // if the parameter is here, send json with a success status code
  return respondJSON(request, response, 200, responseJSON);
};

// function to show not found error
const notFound = (request, response) => {
  // error message with a description and consistent error id
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  // return our json with a 404 not found error code
  respondJSON(request, response, 404, responseJSON);
};

const forbidden = (request, response) => {
  // error message with a description and consistent error id
  const responseJSON = {
    message: 'You do not have access to this content.',
    id: 'notFound',
  };

  // return our json with a 404 not found error code
  respondJSON(request, response, 403, responseJSON);
};

const unauthorized = (request, response) => {
  // error message with a description and consistent error id
  const responseJSON = {
    message: 'Missing loggedIn query parameter set to yes.',
    id: 'Unauthorized',
  };

  // return our json with a 404 not found error code
  respondJSON(request, response, 401, responseJSON);
};

const internal = (request, response) => {
  // error message with a description and consistent error id
  const responseJSON = {
    message: 'Internal Server Error.',
    id: 'internal',
  };

  // return our json with a 404 not found error code
  respondJSON(request, response, 500, responseJSON);
};

const notImplemented = (request, response) => {
  // error message with a description and consistent error id
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  // return our json with a 404 not found error code
  respondJSON(request, response, 501, responseJSON);
    console.log("Hi mom");
};

// exports to set functions to public.
// In this syntax, you can do getIndex:getIndex, but if they
// are the same name, you can short handle to just getIndex,
module.exports = {
  success,
  badRequest,
  notFound,
  forbidden,
  unauthorized,
    internal,
    notImplemented,
};
