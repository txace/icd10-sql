var util = require('mis-util');
var config = require('./config.ignore');

var options = {
   sysname: '/c1/FRSH',
   webname: '/c0/cmhcweb/cmhcbui/cmhcbuilocal/',
   connect: {
      host: 'gccmhc',
      user: 'tim',
      password: config.user
   },
   cron: {
      user: 'datamgr',
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

mis.deploy.usc()
.then(function(scripts) { 
   mis.script.installcompile()
   .then(function() {
     return mis.script.compile(
         scripts.filter(function(script) { return script.indexOf('inc_') < 0 }));
   })
   .then(mis.script.uninstallcompile);
});

mis.deploy.dir('./Resources/', options.webname + 'our_images/', 'gif', true);
mis.deploy.dir('./Resources/oatmeal_tumbeasts/', options.webname + 'our_images/', 'png', true);
