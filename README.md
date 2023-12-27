# [RFC] NextJS Multi-app / Handoff

## Background

- faire.com is made up of 2 React SPAs and has around 400 unique routes.
- We're currently migrating our retailer portal to NextJS (App Router).

## Problems

1. Downsides of monoliths

- The build times are pretty slow (~10 mins for `next build` & ~2 mins for `next dev`).
  - We have top-level parallel routes for each user type (logged-out, logged-in retailer, logged-in brand)
- There are single points of failure (e.g. root layout)

2. Direct loads are slower than route changes

- With NextJS, we can prefetch RSC payloads so that the browser has all of the necessary resources to quickly render the next page on the client.
  - This is noticeably faster than direct loading the subsequent page from another app upon navigation.

## Possible Solution

Implement support for route changes (with prefetching) across different NextJS applications.

**Note**: I have an idea of how route changes work in the NextJS App Router right now based on its current behaviour. Please let me know if this makes sense.

### RSC Payload Requests

- NextJS makes a request to the server on (or before) a route change to render the server components for the subsequent route into a [RSC payload](https://nextjs.org/docs/app/building-your-application/rendering/server-components#how-are-server-components-rendered).
  - The payload includes references to JS files needed to render the next page.
  - For navigating across apps, the request needs to be routed to the NextJS server that is responsible for rendering the next route.
    - This needs to be handled by something that sits in front of **both** NextJS apps (e.g. Cloudflare).
  - Since the next page is rendered from a different app, the server also needs to render the root layout and include references for the new main app.

### Switching NextJS apps on the client

- Once the browser has the payload, it can download all of the necessary JS files.
- When the user navigates, we need to tell the browser to stop executing the current app, and start executing the next one.
  - This can potentially be done by including a simple "harness" file that swaps between `main` JS scripts.
