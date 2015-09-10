var express = require('express');
var soap = require('soap');
var router = express.Router();

/* GET statement for a ID number listing. */
router.get('/:id', function(req, res, next) {
  

/* XML SAMPLE MESSAGE 

<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
  <Header>
    <requestHeader xmlns="http://standardbank.co.za/sa/services/global/tech">
        <timestamp xmlns="">2015-09-02T16:01:55.880+02:00</timestamp>
        <traceMessageId xmlns="">8dc1f673-94e9-4f09-a819-82c3d0c069e5</traceMessageId>
        <enterpriseTraceUUId xmlns="">9FD52820-42D2-4352-A40A-5237B718AC81</enterpriseTraceUUId>
        <contentType xmlns="">TEXT/XML</contentType>
        <sender xmlns="">
          <senderId>0</senderId>
          <sourceSystem>199</sourceSystem>
          <sourceApplication>108</sourceApplication>
          <applicationSessionId>SBG Mobile GW</applicationSessionId>
        </sender>
    </requestHeader>
  </Header>
  <Body>
    <getInformalStatementRequest xmlns="http://standardbank.co.za/sa/services/Support/communication/StatementV2/elements">
        <statement xmlns="">
          <processingRequest>
              <returnAccountDetailsIndicator>Yes</returnAccountDetailsIndicator>
              <retainAndReturnSortCriteria>Yes</retainAndReturnSortCriteria>
              <retainAndReturnSearchCriteria>Yes</retainAndReturnSearchCriteria>
          </processingRequest>
          <accountIdentification>
              <accountNumber>273385534</accountNumber>
              <accountSystemId>1</accountSystemId>
              <serialNumber>000</serialNumber>
              <countryCode>ZA</countryCode>
              <currencyCode>ZAR</currencyCode>
          </accountIdentification>
          <searchCriteria>
              <statementType>fromLastStatement</statementType>
          </searchCriteria>
          <filterCriteria/>
          <sort>
              <sortType>Date</sortType>
              <sortCriteria>Normal</sortCriteria>
          </sort>
          <paging>
              <pagingRequired>Yes</pagingRequired>
              <pageNo>1</pageNo>
          </paging>
        </statement>
    </getInformalStatementRequest>
  </Body>
</Envelope>
*/  

var url = 'http://esbdpd01.standardbank.co.za:9109/sa/services/enterprise/support/communication/statementmanagementv2.0';

var sender = {senderId: 0,
                sourceSystem:199,
                sourceApplication:108,
                applicationSessionId:'Geneis POC'};
var requestHeader = {requestHeader: 
                    {'-xmlns': 'http://standardbank.co.za/sa/services/global/tech',
                      timestamp: '2015-09-02T16:01:55.880+02:00',
                      traceMessageId: '8dc1f673-94e9-4f09-a819-82c3d0c069e5',
                      enterpriseTraceUUId: '9FD52820-42D2-4352-A40A-5237B718AC81',
                      contentType: 'TEXT/XML',
                      sender: sender}
                    };

var body = {getInformalStatementRequest:
              {'-xmlns': 'http://standardbank.co.za/sa/services/Support/communication/StatementV2/elements',
                statement: 
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
                  '-xmlns': 'http://schemas.xmlsoap.org/soap/envelope/',
                  Header: requestHeader,
                  Body: body}
                };               

res.send(JSON.stringify(envelope));

 
  soap.createClient(url, function(err, client) {
      
  
      if (client) {
        client.endpoint = 'http://esbdpd01.standardbank.co.za:9109/sa/services/enterprise/support/communication/statementmanagementv2.0';
        console.log(client.endpoint);
        client.getInformalStatement(envelope, function(err, result) {
        if (result) {
          console.log("Works" + JSON.stringify(result))
        } 
        else {
          console.log("Broken")
        }
        
        console.log(client.request);
        console.log('Result:' + JSON.stringify(result));
        //res.send(JSON.stringify(result))
       // console.log('Error:' + err);
        });
      }
      else {
        console.log("Error")
        console.log(err);
      }
  });
  
  
  //res.send('Statement Requested for ID number: ' + req.params.id);
});

module.exports = router;
