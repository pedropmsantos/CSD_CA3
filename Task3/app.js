const server = require('./server');
const ConstVars = require('./const');


server.boot.listen(ConstVars.envVars.port, ConstVars.envVars.hostname, () => {
  console.log(`Server running at http://${ConstVars.envVars.hostname}:${ConstVars.envVars.port}/`);

});
