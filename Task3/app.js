// Student Name: Pedro Paulo Macena Santos
// Student Number: L00161845

const server = require('./server');
const ConstVars = require('./const');


const initiateServer = server.boot.listen(ConstVars.envVars.port, ConstVars.envVars.hostname, () => {
  console.log(`Server running at http://${ConstVars.envVars.hostname}:${ConstVars.envVars.port}/`);

});

exports.initiateServer = initiateServer;
