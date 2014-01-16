---
layout: post
title: "Safari Web Content using all my CPU and RAM"
published: true
---

This post is a bit of a departure from my normal style, but it took me hours of searching to finally nail this down and resolve the issue.

I'm using OS X 10.9.1 on a Mid-2010 MacBook Pro, Safari is version 7.0.1.

## The Problem

At some point a few days ago I noticed that my CPU fan was blasting for what seemed like no reason at all. So I did what any rational person would do. I opened Activity Monitor.

Safari Web Content was using 100% CPU over 1GB of RAM and was "Not Responding".

I tried killing the little bugger, but to no avail. Every time I  went back to using Safari the problem resurfaced.

I found a very helpful, but unfortunately also very long [thread on Apple's Support Community](https://discussions.apple.com/thread/3190569).

Turns out this is a side effect of things going badly with Top Sites.

## Solutions

You can disable Top Sites all together:

1. Go to “Safari” > “Preferences” > “General” and change new windows and new tabs to open with a blank page (or anything besides Top Sites)

2. Try to figure out which of your top sites is causing the issue. I suspect that if there is one with no preview (having the black background with a grey safari icon overlaid instead) it is probably the culprit, but I can't verify that.


Another theory I have about which sites to remove from Top Sites is ones that use a lot of JavaScript or Flash.

Safari has to run and render all code in the website in order to generate the preview. The more code it has to run, the more potential for problems.

Anyway hope this helps some poor person with this problem :)

**edit**: I've just discovered that if you hover over the “Safari Web Content” item in Activity Monitor, the hover text will show the url of the page being rendered!
    