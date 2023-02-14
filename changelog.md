Changelog
=========

0.3.0 (2023-02-14)
------------------

* This package now supports ESM and CommonJS modules.
* No longer supports Node 14. Please use Node 16 or higher.


0.2.0 (2022-09-03)
------------------

* Upgraded from `@curveball/core` to `@curveball/kernel`.


0.1.6 (2022-03-14)
------------------

* Update dependencies
* Update everything to latest coding standards.


0.1.5 (2020-12-10)
------------------

* No longer requires esModuleInterop.


0.1.2 (2020-08-21)
------------------

* Links middleware threw an error when `ctx.request.body` was a string.


0.1.1 (2020-06-16)
------------------

* Make sure declarations file is included in `dist/`


0.1.0 (2020-06-16)
------------------

* First version
* Parses HAL links and HTTP Link headers from requests.
* Automatically generates HTTP Link headers in responses.
