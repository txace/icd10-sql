var util = require('mis-util');
var config = require('./config.ignore');

var options = {
   sysname: config.sysname,
   webname: config.webname,
   connect: {
      host: config.host,
      user: config.name,
      password: config.user
   },
   cron: {
      user: config.cronname,
      pass: config.cron
   },
   view_path: {
      local: './view/',
      remote: '/CUST/forms/'
   },
   parm_path: {
      local: './build/'
   },
   usc_path: {
      local: './uScript/'
   }
};

var mis = util(options);

//test with a fake client
mis.script.runonce('./tests/lib-batch-test.usc',['000100']);

