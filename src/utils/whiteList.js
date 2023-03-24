const whitelist = ['containers-us-west-193.railway.app'];

export default function (req, callback) {
  let corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }; // Allow requesting domain
  } else {
    corsOptions = { origin: false }; // Block requesting domain
  }
  callback(null, corsOptions);
}
