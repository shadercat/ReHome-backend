const cluster = require('cluster');

if (cluster.isMaster) {
    require('./masterInstance');
} else {
    require('./workerInstance');
}
