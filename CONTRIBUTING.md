# Contributing

TODO: This will eventually have a nice and welcoming intro to contributing to
the project. For now, just talk to @mroth!

## About the project

### Project Focus and Management

This project is currently in an initial focus towards the end goal of restoring
basic functionality of the main Emojitracker.com site.

-   A series of small, atomic changes, in order, towards the goal.
-   Prior to that point, no unsolicited PRs will be considered.

Project planning here: https://github.com/mroth/emojitrack-web-react/projects/1

### Design Goals

-   Favor the simplest and most standard possible solution. The JavaScript
    ecosystem changes far too rapidly, and we want something that can sustain
    itself as well as possible.

### Code of Conduct

Please note that this project is released with a [Contributor Code of
Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to
abide by its terms.

## Development

All PRs are automatically built and deployed to Netlify with every commit.

### Developing in "Airplane Mode"

If you wish to develop without an active internet connection, use the provided
docker-compose workflow. Simply running `docker-compose up` will fire up a full
copy of the production infrastructure on your local machine. Thanks to the magic
of containers, this is actually _very_ efficient, and is a fraction of the size
of the local NodeJS dependencies. ;-)

Then, you can run your local development server as normal, but override the API
endpoints to be local:

    REACT_APP_REST_API=http://localhost:8000/v1 REACT_APP_STREAM_API=http://localhost:9000 npm start

Since the Emojitracker Feeder is not something you can easily run locally
(requires Twitter partner access, and is very computationally and bandwidth
expensive), the Docker Compose workflow relies on [emojitrack-fakefeeder] which
feeds redis with fake data that looks very similar to our production data -- the
rate of individual emoji is even determined based on [historic projections]. As
an added convenience, you can adjust the `-rate` of updates in the
`docker-compose.yml` file, which can also be handy to prototype off a slower
rate than the full production firehose, usually for performance reasons.

Note the _first time_ you run the command, the base images will need to be
pulled, which results in about 50MB of files being downloaded. So you should
probably do that before getting on the plane.

[emojitrack-fakefeeder]: https://github.com/emojitracker/emojitrack-fakefeeder)
[historic projections]: https://github.com/mroth/weightedrand
