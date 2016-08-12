# HTTP HMAC Signer for Paw

A [Paw extension][1] that implements version 1.0 of the [HTTP HMAC Spec][2] to sign and verify RESTful web API requests.

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

1. In the request panel, select the **Headers** tab.
2. Add a new header.
3. For the **Header Name**, type "Authorization".
4. For the **Header Value**, start typing "HTTP HMAC". The autocomplete drop-down will suggest "HTTP HMAC Spec 1.0": select it.
5. Click on the "HTTP HMAC 1.0 signature" token to open a popup where you can supply your credentials.
6. Fill in the required credentials.
7. Add "Content-Type" and "Date" headers, required for the HTTP HMAC spec.
8. Make your request.

## License and copyright

This extension is copyright [Mark Trapp][3]. All Rights Reserved. It is made available under the terms of the MIT license. A copy of the license can be found in the LICENSE file within this repository.

## Disclosure and disclaimer

I am an employee of [Acquia Inc.][4], the author of the HTTP HMAC Spec. This extension was created as a personal project and had no Acquia involvement. Likewise, the development of this extension has no involvement from [Paw Inc.][5], the developers of Paw, with whom I am not affiliated in any way.

[1]: http://luckymarmot.com/paw/extensions/
[2]: https://github.com/acquia/http-hmac-spec/tree/1.0
[3]: https://marktrapp.com
[4]: https://www.acquia.com
[5]: https://luckymarmot.com/paw
