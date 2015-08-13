var util = require('mis-util');
var config = require('./config.ignore');

var options = {
   sysname: config.sysname,
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

mis.script.runonce('./dst/ICD10DST.usc', [config.scripts.dststart, config.scripts.trace, config.scripts.gaf_dct, 
      config.scripts.status_dct, config.scripts.parmary_axis_dct, config.scritps.abl_dct, config.scripts.reason_dct])
.then(function() {
return mis.deploy.usc()
.then(function(scripts) { 
   mis.script.installcompile()
   .then(function() {
     return mis.script.compile(
         scripts.filter(function(script) { return script.indexOf('inc_') < 0 }));
   })
   .then(mis.script.uninstallcompile);
});
});
