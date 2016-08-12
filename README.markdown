# HTTP HMAC Signer for Paw

A [Paw extension][1] that implements version 2.0 of the [HTTP HMAC Spec][2] to sign and verify RESTful web API requests.

## Installation

First, install [Homebrew](http://brew.sh/) if you don't already have it installed. Next:

```sh
brew install node
git clone git@github.com:itafroma/http-hmac-paw.git
cd http-hmac-paw
npm install
./node_modules/.bin gulp install
```

You can confirm the extension is installed in Paw by opening the extensions manager via the **Paw** → **Extensions** → **Manage extensions…** menu.

## Usage

Signing requests with HTTP HMAC Spec v2 involves a number of required headers, outlined below. Once the headers are supplied, you can make requests as per normal Paw usage.

### X-Authorization-Timestamp

This header is required for all requests. For this header's value, find and select the <kbd>**Timestamp** *Epoch Time*</kbd> dynamic value token. There is no additional configuration.

### X-Authorization-Content-SHA256

This header is required if you have a request body. For this header's value, find and select the <kbd>**SHA256**</kbd> dynamic value token. Then, click on the token to bring up its configuration:

- **Input**: Find and select the <kbd>**Request Raw Body**</kbd> dynamic value token.
- **Algorithm:** SHA256
- **Encoding:** Base64

### Content-Type

This header is required if you have a request body. For this header's value, use whatever mimetype is appropriate for your request body.

### Authorization

This header is required for all requests. For this header's value, find and select the <kbd>**HTTP HMAC Spec** *Signature v2.0*</kbd> dynamic value token. Then, click on the token to bring up its configuration:

- **Realm**: Use the Realm supplied by the API documentation.
- **API Key ID**: Use the API Key ID given to you.
- **API Secret Key**: Use the API Secret Key given to you. This *must* be Base64-encoded if it isn't already.
- **Request**: Advanced usage; you can usually just leave this set to "Current Request"

## Known Issues

The extension doesn't currently support signing requests with additional custom headers.

## License and copyright

This extension is copyright [Mark Trapp][3]. All Rights Reserved. It is made available under the terms of the MIT license. A copy of the license can be found in the LICENSE file within this repository.

## Disclosure and disclaimer

I am an employee of [Acquia Inc.][4], the author of the HTTP HMAC Spec. This extension was created as a personal project and had no Acquia involvement. Likewise, the development of this extension has no involvement from [Paw Inc.][5], the developers of Paw, with whom I am not affiliated in any way.

[1]: http://luckymarmot.com/paw/extensions/
[2]: https://github.com/acquia/http-hmac-spec/tree/1.0
[3]: https://marktrapp.com
[4]: https://www.acquia.com
[5]: https://luckymarmot.com/paw
