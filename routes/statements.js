var express = require('express');
var unirest = require('unirest');
var router = express.Router();
var path = require('path');

/* 

GET statement for a ID number listing. 

Dummy JSON string below with the following test Accounts:
  33722854
  282974709 
  273385534

Could not use the node-soap as the ESB service did not parse the package correctly (worked in SOAP UI)
We have reverted to a simpler middle layer to rpovide us with the required JSON response.
This is a temp solution and we would prefer ESB to provide a JSON rest response directly.

*/

router.get('/:id', function (req, res, next) {

  var url = 'http://dd2vqibwas1l.standardbank.co.za:9180/soap-service-router-rs/rest/informalstatement';

  unirest.post(url)
    .header('Accept', 'application/json')
    .type('json')
    .send(
      {
        "statement": {
          "processingRequest": {
            "returnAccountDetailsIndicator": "Yes",
            "retainAndReturnSortCriteria": "Yes",
            "retainAndReturnSearchCriteria": "Yes"
          },
          "accountIdentification": {
            "accountNumber": req.params.id,
            "accountSystemId": "1",
            "countryCode": "ZA",
            "currencyCode": "ZAR",
            "serialNumber": "000"
          },
          "searchCriteria": {
            "statementType": "fromLastStatement"
          },
          "paging": {
            "pagingRequired": "Yes",
            "pageNo": 1
          },
          "routingID": "",
          "productNumber": "",
          "sort": {
            "sortType": "Date",
            "sortCriteria": "Normal"
          }
        }
      }
      )
    .end(function (response) {
      if (response.error) {
        console.log(response);
        res.send(response);
      }
      else {   
        console.log(response.body);
        res.send(response.body);
      }
      /* 
      This is the switch between mock data and real data 
      */
      //res.sendFile(path.join(__dirname, '../public', 'sampleAccount.json'))
      
    });
}
  );

module.exports = router;


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