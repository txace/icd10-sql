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

//deploy and compile the uscripts
mis.deploy.usc()
.then(function(scripts) { 
   mis.script.installcompile()
   .then(function() {
     return mis.script.compile(
         scripts.filter(function(script) { return script.indexOf('inc_') < 0 }));
   })
   .then(mis.script.uninstallcompile);
});

//build and deploy the parmfiles
console.log('parms');
mis.parm.fromflatfile('parm/dx10.ignore')
.then(mis.parm.tofile.bind(mis, 'build/DX10.parm'))
.then(mis.deploy.parm);

//deploy the resources
mis.deploy.dir('./Resources/', options.webname + 'our_images/', 'gif', true);
mis.deploy.dir('./Resources/oatmeal_tumbeasts/', options.webname + 'our_images/', 'png', true);

