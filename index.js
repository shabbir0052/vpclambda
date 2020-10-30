const https = require('https');
var fs  = require('fs');

        var sscert= fs.readFileSync('./csaa-root-sscert.pem');

exports.handler = async (event) => {
    
let dataString = '';
    
    const response = await new Promise((resolve, reject) => {
        
        console.log(`cert--> ${sscert} `)
        
var options = {
  hostname: 'pit-soaservices.tent.trt.csaa.pri',
  port: 2068,
  path: '/dev/csaa/v1.1/address/retrieveZipCodeDetails?postalCode=85029',
  method: 'GET',
  ca: sscert
};
        
        //const req = https.get("https://192.168.49.97:2068/dev/csaa/v1.1/address/retrieveZipCodeDetails?postalCode=85029", function(res) {
        const req = https.get(options, function(res) {
          res.on('data', chunk => {
            console.log(`chunk--> ${chunk}`);  
            dataString += chunk;
          });
          res.on('end', () => {
            resolve({
                statusCode: 200,
                body: JSON.stringify(JSON.parse(dataString), null, 4)
            });
          });
        });
        
        req.on('error', (e) => {
          console.log(`error--> ${e}`);  
          reject({
              statusCode: 500,
              body: 'Something went wrong!'
          });
        });
    });
        
console.log(`response-->${response}`);  
    return response;
};