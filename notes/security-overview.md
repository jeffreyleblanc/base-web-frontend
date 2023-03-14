# Web Security Overall

Note: This is an evolving document.

These topics also cut across the front/back end divide.

## Cookies

A useful [overview at MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)

A few lesser known but key characteristics of cookies to keep in mind:

* `Secure`: Only sends the cookie on an https request
* `SameSite`: Controls where a cookie is sent to:
    * `="Strict"`: means that the browser sends the cookie only for same-site requests
    * `="Lax"` (default value), same a strict but "is sent when a user is navigating to the origin site from an external site"
    * `="None"` means that the browser sends the cookie with both cross-site and same-site requests
        * only this works within iframes where the parent is a different origin often
    * See the [SameSite MDN Page](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite)
* `HttpOnly`: Forbids JavaScript from accessing the cookie.

Note techniques for securing the actual cookie:

* Encrypt the cookie with a key known only on the server
    * If you put actual auth data in there, it's close to a JSON Web Token (jwt)
    * You can put just a key that is the pk for data stored on the server


## Fetch

Basically HTTP calls made from the client using javascript.

## Websockets

One of the key issues with websockets when made from javascript in the browser, is that Errors are generic exceptions along the lines of:
`DOMException: Failed to construct 'WebSocket': The URL 'undefined' is invalid.`.

This means that it can be impossible to distinguish between a network failure, a 404, a 403... etc.

The best way to improve this situation is to make a GET endpoint on your service that can simulate the behavior of the websocket handler.
Then you can use a fetch call from the client javascript to get a better idea of what is going on and provide the user helpful feedback.

In addition, websocket connections generated from javascript are limited to the following options see [WebSocket() at MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/WebSocket):

* url
* protocol that populates the `Sec-WebSocket-Protocol` header field

Note that cookies are sent with the request as normal requests are. However if you want some other means of authenticating/distinguishing a websocket
connection on the server side, you must have the client:

* use a unique path and/or append a query parameter to the request URL
    * While this is wrapped within SSL, it can be logged by things like nginx
* add a protocol field
    * What constitutes a valid field is vague, and experimentation suggests we can put almost anything we want in there

Additional topics include distinguishing websocket connections from same user, with duplicate pages.

The question of the life cycle of a websocket connection (the inevitable drop and then reconnect), and
efficiently and clearly maintaining security is a big topic. More patterns for this soon.


## Iframes

Issues with iFrames and cookies are described above.

Notes:

* <https://developer.mozilla.org/en-US/docs/Web/Security/IFrame_credentialless>

## Cross Site Request Forgery (CSRF)

Notes:

* <https://developer.mozilla.org/en-US/docs/Glossary/CSRF>
* <https://owasp.org/www-community/attacks/csrf>
* <https://en.wikipedia.org/wiki/Cross-site_request_forgery>


## Browser Quirks

There are differences between browsers that change, but are important to track:

* Safari
    * If you click through and make SSL cert exceptions, websockets still break
* Firefox
    * Cloning a tab seems to literally copy the initial HTML document from the initial page,
      meaning any specific items rendered from a server side template (such as a page unique key)
      are preserved. Chrome/Chromium seem to refetch the page instead.



