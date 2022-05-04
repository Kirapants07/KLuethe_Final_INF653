// There are 3 types of parameters that you can look for: 
// 1) body - sent in the body of a request (GET requests do not do this - this is usually how POST, PUT, PATCH, and DELETE send params)
// 2) URL - defined in the request URL like this - url.com/:param - (Any type of request can use these. It is a dynamic URL)
// 3) query - added at the end of the URL like this - url.com?param=Socks (Usually GET requests)

// Express retrieves each of these types differently from the request object (shown as req below): 
// url.com/:state - req.params.state
// url.com/?whatever - req.query.whatever
// And any parameter sent in the body of a request is available with the same pattern: req.body.param_name 

//You can also retrieve these with object destructing: const { param_name } = req.query (or req.params or req.body) if you wish