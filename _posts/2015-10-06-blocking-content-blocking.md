---
layout: post
title: "Blocking Content Blocking"
published: true
---

I can’t help but chuckle about all the hand-wringing over content blockers in iOS 9. Ad blockers have existed for some time. Not many people use them (as a percentage of overall web users). Plus, native advertising is mostly immune to content blocking anyway, and that’s where a lot (most?) of the money was going to end up anyway. 

That’s old news. My favorite part is: it’s really not that hard to make nearly unblockable ads. If the publishers and ad networks worked together they could mostly nullify the effects of ad blockers in lots of ways.

1. They could insert the ads server-side in a way indistinguishable from content. Then load the ad network’s javascript purely to mark the ads as “sponsored content” and handle tracking. This would make it so that people using ad-blockers would have more trouble telling where the ads are, but everyone would see the ads.

2. Ad networks could build CDN-like infrastructure and insert their ads in pre-specified parts of the page (like how Vagrant builds pages). This approach lets everything come down from one domain but takes care of publisher accountability (publishers can’t screw the ad network).

      Alternatively, an actual CDN (like CloudFront) could provide hooks for publishers and Ad networks (again, like Vagrant) to insert ads into pages within the same domain, and do impression/click tracking on the same domain as well. This variant solves some of the incentive issues (publishers don’t have to trust the ad networks either) by moving trust on a third-party (the CDN). I prefer this variant in terms of incentives, but it requires more coordination, so it might be harder for a CDN to succeed in the marketplace with this approach.

3. Ads can be sold on an average-traffic or pay-per-click basis (i.e. the Deck), but without any 3rd party javascript. The markup inserted by publishers is just a clickable hot linked image, and the ad is rotated by just changing the image served at that url, and changing the destination of the link’s redirect. Publishers would just have to insert a unix timestamp in the querystring of the image and link to invalidate caches, deal with fast ad rotations, and all sorts of other issues. This method is relatively blockable, but easily pairs with a CDN-like approach.

      What I like about this is the simplicity, and the fact that it represents a line in the sand. You can easily say, ads served as third-party images are OK, but not ads served as 3rd party javascript or 3rd party iframes.

Anyway, there are lots of details around all these approaches that would have to be worked out. And plenty of pros and cons of each one as well (for all parties involved, consumers, advertisers, publishers, and ad networks. And CDNs should they choose to get in the middle of all this.)