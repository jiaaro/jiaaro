--- 
layout: post
title: Software is all about context
published: true
---

In the early days, the context was the world, and you went to a computer and gave it some 
information to crunch and then returned to the world. Now as we move into an era dominated 
by computing, context is often completely within your computing experience.

You don’t do your taxes at your desk and type the mathematical computations into your 
computer anymore. You download your bank statements, import them into your tax software, 
and submit your tax returns over the internet.

If this is how things are going to be (I would bet on it). The context created by the 
 software we create needs to be smarter.

I don’t need to know about restaurants in 23rd and Park Ave (New York) when I’m alone 
in my apartment. I need to know about them when a group of friends and I spontaneously decide 
to go out for lunch on a thursday.

Computers have taken us a long way in 
terms of reducing the amount of time it takes to get information, but I think the real 
power is when it’s fast enough to effectively become augmented intelligence. 
Basically where internet access is fast enough that your brain going to the internet for info 
is more like hitting ram than hitting the hard disk (which is 
[slow as hell](http://i.imgur.com/X1Hi1.gif)). We’re pretty close already - probably within an order or magnitude in terms of network 
speed.

I don’t know about you, but the real problem I have, is knowing how to ask for exactly the 
information I want.

As it stands, just about anyone can find the wikipedia article that 
contains a given bit of information without much trouble (a few minutes at most), but It could
take you half an hour to read some of the articles on wikipedia enough to find the information 
you need.

This is the opportunity.

If there was some kind of system tracking your context the computer could do the scanning for 
you, and I’m not talking about ctrl+f.

What I really want to see is for the information to be prefetched and displayed automatically. 
The computer should be able to eliminate the: 
  
 1. google search
 2. clicking on the wikipedia result
 3. scanning the article.
  
It should just skip to showing you [that paragraph about how mark twain used his childhood friend as inspiration for a character](http://en.wikipedia.org/wiki/Mark_Twain#Legacy) so you can use him as an example for your next blog post/term paper.

Don’t force us to remember this stuff.

Don’t force us to go look for it.

You should be able to half remember it. Vaguely describe it, and then have your computer go through your history and show you similar things you’ve come across that could be the thing you mean.

You know... the same thing your friend would do in conversation... that takes 20 minutes of both of your time to finally figure out what was on the tip of your tongue.

That’s how people work, and the goal is for computers to help us get things done. right?

Computers should do that for us. They’re much better at these types of tasks, as long as we can write the software to figure out what info you need <b>right now</b>.

That’s a hard example though, so here’s one you can implement tonight:

Let’s say you build software with users. Let’s also say that these users interact 
with each other.

When you start typing into a field, try to autocomplete using first OR last name OR email address OR any other identifier in your system. And make sure people I’ve typed in this field before get sorted to the top. I probably mean them. Also any people I’ve recently connected with should get extra weight as well.

This is pretty specific and probably wrong in your application so here is the most important part: measure your success rate. Keep track of how often I pick on of your autocomplete suggestions and keep tweaking the algorithm for better suggestive power.

Measure --> update --> start over


  
  
