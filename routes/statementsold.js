var express = require('express');
var soap = require('soap');
var router = express.Router();
var path = require('path');

/* GET statement for a ID number listing. */
router.get('/:id', function(req, res, next) {

  var url = 'http://127.0.0.1:8080/StatementV2_0SoapBinding/?WSDL';
  //var url = 'http://dd2vqibwas1l.standardbank.co.za:9180/soap-service-router-rs/';
    
    
  var sender = {senderId: 0,
                sourceSystem:199,
                sourceApplication:108,
                applicationSessionId:'Geneis POC'};
  var requestHeader = {requestHeader: 
                  // {'-xmlns': 'http://standardbank.co.za/sa/services/global/tech',
                     {timestamp: '2015-09-02T16:01:55.880+02:00',
                      traceMessageId: '8dc1f673-94e9-4f09-a819-82c3d0c069f4',
                      enterpriseTraceUUId: '9FD52820-42D2-4352-A40A-5237B718AC81',
                      contentType: 'TEXT/XML',
                      sender: sender}
                    };

var body = {getInformalStatementRequest:
              //{'-xmlns': 'http://standardbank.co.za/sa/services/Support/communication/StatementV2/elements',
                {statement: 
                {processingRequest:
                  {
                    returnAccountDetailsIndicator: 'Yes',
                    retainAndReturnSortCriteria: 'Yes',
                    retainAndReturnSearchCriteria: 'Yes',
                  },
                  accountIdentification:
                  {
                    accountNumber:282974709,
                    accountSystemId:1,
                    accountSerialNumber:'000',
                    countryCode:'ZA',
                    currencyCode:'ZAR'
                  },
                  searchCriteria:
                  {
                    statementType:'fromLastStatement'
                  },
                  sort:
                  {
                    sortType:'Date',
                    sortCriteria:'Normal'
                  },
                  paging:
                  {
                    pagingRequired: 'Yes',
                    pageNo: 1
                  } 
                }   
              }
           };
var envelope = {Envelope:
                {                  
                // '-xmlns': 'http://schemas.xmlsoap.org/soap/envelope/',
                  Header: requestHeader,
                  Body: body}
                };      
  
  
  //console.log(jsonStr);
  /*var attributes = {
    Envelope: {
      attributes: {
        xmlns: 'http://schemas.xmlsoap.org/soap/envelope/'
      }
    },
    Header: {
      requestHeader: {
        attributes: {
          xmlns: 'http://standardbank.co.za/sa/services/global/tech'
        }
      }
    },
    Body: {
      getInformalStatementRequest: {
        attributes: {
          xmlns:'http://standardbank.co.za/sa/services/Support/communication/StatementV2/elements'
        }
      }
    }
  }
  
  var wsdlOptions = {
    attributesKey: attributes
  }
  
  */
  

  //soap.createClient(url, wsdlOptions, function (err, client) {
  
    soap.createClient(url, function(err, client) {
        //console.log(client);
        if (client) {
          client.endpoint = 'http://esbdpd01.standardbank.co.za:9109/sa/services/enterprise/support/communication/statementmanagementv2.0';
          //client.endpoint = 'http://dd2vqibwas1l.standardbank.co.za:9180/soap-service-router-rs/rest/informalstatement';
          console.log(client.endpoint);
          client.getInformalStatement(envelope, function(err, result) {
            console.log('Result:' + result);
            console.log('Error:' + err);
            res.send(JSON.stringify(result));
          });
        }
        else {
          console.log(err);
        }
    });
    
    //res.send('Statement Requested for ID number: ' + req.params.id + );
    //res.sendFile(path.join(__dirname, '../public', 'sampleAccount.json'));

  }
);

module.exports = router;