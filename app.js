var http = require('http');

http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello World\n');



}).listen(8124);

console.log('Server running at http://127.0.0.1:8124/');

var paypal_sdk = require('paypal-rest-sdk');
paypal_sdk.configure({
  'host': 'api.sandbox.paypal.com',
  'client_id': 'ASyPbhBVq8ZRt4gryscZwnWCbQGJaImH1e1MH3GW2DL7jLyWRDaVIX-mTMIW',
  'client_secret': 'ENh6PRD3R3JirmZqBEkCjYlgMrvYCDe23OivRAmmyuBDOi3jHo-I2OZVNmXg' });
paypal_sdk.generate_token(function(error, token){
  if(error){
    console.error(error);
  } else {
    console.log(token);
  }
});

var payment_details = {
  "intent": "sale",
  "payer": {
    "payment_method": "credit_card",
    "funding_instruments": [{
      "credit_card": {
        "type": "visa",
        "number": "4417119669820331",
        "expire_month": "11",
        "expire_year": "2018",
        "cvv2": "874",
        "first_name": "Joe",
        "last_name": "Shopper",
        "billing_address": {
          "line1": "52 N Main ST",
          "city": "Johnstown",
          "state": "OH",
          "postal_code": "43210",
          "country_code": "US" }}}]},
  "transactions": [{
    "amount": {
      "total": "1.00",
      "currency": "USD",
      "details": {
        "subtotal": "1.00",
        "tax": "0.00",
        "shipping": "0.00"}},
    "description": "This is the payment transaction description." }]};

paypal_sdk.payment.create(payment_details, function(error, payment){
  if(error){
    console.error(error);
  } else {
    console.log(payment);
  }
});