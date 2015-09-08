var express = require('express');
var soap = require('soap');
var router = express.Router();

/* GET statement for a ID number listing. */
router.get('/:id', function(req, res, next) {
  
  var url = 'http://10.5.44.140:8088/mockStatementV2_0SoapBinding/?WSDL';
  
  var args = {IDNumber: req.params.id};
  
  
  soap.createClient(url, function(err, client) {
      client.endpoint = 'http://10.5.44.140:8088/mockStatementV2_0SoapBinding/';
      console.log(client.endpoint);
      client.getInformalStatement(args, function(err, result) {
          console.log('Result:' + result);
          console.log('Error:' + err);
      });
  });
  
  
  
  res.send('Statement Requested for ID number: ' + req.params.id);
});

module.exports = router;