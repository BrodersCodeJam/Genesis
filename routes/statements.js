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

var url = 'http://10.5.44.140:8088/mockStatementV2_0SoapBinding/?WSDL';
var sender = {senderId: 0,
                sourceSystem:199,
                sourceApplication:108,
                applicationSessionId:'Geneis POC'};
var requestHeader = {requestHeader: 
                      {timestamp: '2015-09-02T16:01:55.880+02:00',
                      traceMessageId: '8dc1f673-94e9-4f09-a819-82c3d0c069e5',
                      enterpriseTraceUUId: '9FD52820-42D2-4352-A40A-5237B718AC81',
                      contentType: 'TEXT/XML',
                      sender: sender}
                    };

var body = {getInformalStatementRequest:
              {statement: 
                {processingRequest:
                  {
                    returnAccountDetailsIndicator: 'Yes',
                    retainAndReturnSortCriteria: 'Yes',
                    retainAndReturnSearchCriteria: 'Yes',
                  },
                  accountIdentification:
                  {
                    accountNumber:273385534,
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
                  Header: requestHeader,
                  Body: body}  
                };

var jsonStr = JSON.stringify(envelope);

console.log(jsonStr);
 
  soap.createClient(url, function(err, client) {
      console.log(client);
      if (client) {
        client.endpoint = 'http://10.5.44.140:8088/mockStatementV2_0SoapBinding/getInformalStatement';
        console.log(client.endpoint);
        client.getInformalStatement(envelope, function(err, result) {
          console.log('Result:' + result);
          console.log('Error:' + err);
        });
      }
      else {
        console.log(err);
      }
  });
  
  res.send('Statement Requested for ID number: ' + req.params.id);
});

module.exports = router;