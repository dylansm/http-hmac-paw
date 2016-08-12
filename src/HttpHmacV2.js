var url = require('url');
var CryptoJS = require('crypto-js');

var HttpHmacV2 = function () {

    this.evaluate = function (context) {

        this.validateInput();

        var nonce = this.nonce();

        return 'acquia-http-hmac '
            + 'realm="' + encodeURIComponent(this.apiRealm) + '",'
            + 'id="' + encodeURIComponent(this.apiKey) + '",'
            + 'nonce="' + encodeURIComponent(nonce) + '",'
            + 'version="' + encodeURIComponent(this.version()) + '",'
            + 'headers="",'
            + 'signature="' + this.signature(nonce) + '"';
    }

    this.title = function (context) {
        return 'HTTP HMAC Spec';
    }

    this.text = function (context) {
        return 'Signature v2.0';
    }

    this.validateInput = function () {

        if (!this.apiRealm) {
            throw new Error('The Realm must be set.');
        }

        if (!this.apiKey) {
            throw new Error('The API Key ID must be set.');
        }

        if (!this.apiSecret) {
            throw new Error('The API Secret Key must be set.');
        }

        if (!this.apiRequest.getHeaderByName('X-Authorization-Timestamp')) {
            throw new Error('The X-Authorization-Timestamp header must be set.');
        }

        if (this.apiRequest.body.length > 0) {

            if (!this.apiRequest.getHeaderByName('Content-Type')) {
                throw new Error('The Content-Type header must be set when sending a request body.');
            }

            if (!this.apiRequest.getHeaderByName('X-Authorization-Content-SHA256')) {
                throw new Error('The X-Authorization-Content-SHA256 header must be set when sending a request body.');
            }

        }

    }

    this.nonce = function () {

        var d = Date.now();

        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);

            return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
        });
    }

    this.version = function () {
        return '2.0';
    }

    this.signature = function (nonce) {

        var requestUrl = url.parse(this.apiRequest.url);

        var signature = [
            this.apiRequest.method,
            requestUrl.host,
            requestUrl.pathname,
            requestUrl.query,
            this.authHeaderParameters(nonce)
        ];

        signature.push(this.timestamp());

        if (this.apiRequest.body.length > 0) {
            signature.push(this.contentType());
            signature.push(this.hashedBody());
        }

        var parsedSecret = CryptoJS.enc.Base64.parse(this.apiSecret);

        return CryptoJS.HmacSHA256(signature.join('\n'), parsedSecret).toString(CryptoJS.enc.Base64);
    }

    this.authHeaderParameters = function (nonce) {

        return 'id=' + encodeURIComponent(this.apiKey) + '&'
            + 'nonce=' + encodeURIComponent(nonce) + '&'
            + 'realm=' + encodeURIComponent(this.apiRealm) + '&'
            + 'version=' + encodeURIComponent(this.version());

    }

    this.timestamp = function () {

        return this.apiRequest.getHeaderByName('X-Authorization-Timestamp');

    }

    this.contentType = function () {

        return this.apiRequest.getHeaderByName('Content-Type');
    }

    this.hashedBody = function () {

        return this.apiRequest.getHeaderByName('X-Authorization-Content-SHA256');
    }
}

HttpHmacV2.identifier = 'com.marktrapp.HttpHmacV2';

HttpHmacV2.title = 'HTTP HMAC Spec v2.0';

HttpHmacV2.help = 'https://github.com/itafroma/http-hmac-paw';

HttpHmacV2.inputs = [
    DynamicValueInput('apiRealm', 'Realm', 'String', {placeholder: 'Acquia'}),
    DynamicValueInput('apiKey', 'API Key ID', 'String'),
    DynamicValueInput('apiSecret', 'API Secret Key', 'SecureValue'),
    DynamicValueInput('apiRequest', 'Request', 'Request')
];

registerDynamicValueClass(HttpHmacV2);
