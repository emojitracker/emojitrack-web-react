emojitrack-web-react

> Experimental React web frontend for Emojitracker.

old frontend server (including old REST API server): https://github.com/mroth/emojitrack-web

Project planning here:
https://github.com/mroth/emojitrack-web-react/projects/1

## Notes

goals:

-   fairly simple, using easy to maintain current best practices. ease of development contributions is important.
-   allow for front-end only development (running against production servers, or with docker-shims for local dev without internet connectivity)
-   fix some issues preventing forward compatibility (such as upcoming 32bit number limit in JS, ugh)
-   library wise, as minimal as possible -- want to lowest maintenance burden, and the JS landscape moves fast...
-   the FE has never had tests before, if someone knows how to add them, and it's useful, could be handy?!

design goals:

-   consider getting rid of bootstrap, just use our own code? (only if it makes things easier!)
-   handle resizing tiles to any screen resolution better (see iOS repo for basic ideas...)

things that might be okay to deprecate:

-   possible to get rid of emoji fallback compatibility for browsers that dont support native emoji display??
-   admin interface (can move elsewhere for now)

out of scope (for now):

-   switching streaming server from SSE to WebSockets or anything like that (though we shoudl make it easy to swap later in the FE if we want)
-   support for new emoji -- though if we could do it in a way that the FE would "just work" if we do all the crazy backend work in the future, that's cool

### Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.
