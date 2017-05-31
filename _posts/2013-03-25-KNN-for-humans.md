---
layout: post
title: "Machine Learning for Humans: K Nearest-Neighbor"
published: true
redirect_from: "/KNN-for-humans/"
---

[![Machine Learning in Action - cover][4]][2]

I've been reading Peter Harrington’s “*[Machine Learning in Action][2]*,” and it’s packed with useful stuff! However, while providing a large number of ML (machine learning) algorithms and sufficient example code to learn how they work, the book is a bit dry.

So I've decided to make my contribution to democratizing ML by posting simple explanations of these algorithms.

## Why Python?

Pure Python isn't the most (computationally) efficient way to implement these algorithms, but that isn't the purpose here. The goal is to help *humans* understand how these algorithms work. Python is great for that. That’s why the book uses Python as well. 

But Harrington takes the alternate route of using the (very powerful) numpy from the get-go, which is more performant, but much less clear, at the expense of the reader. 

Well that’s crap; let’s start learning!

## What is KNN (K nearest neighbor) good for?

This is a good question to answer up front. Why are we doing this in the first place?

KNN is a “classifier”, which is a type of algorithm that (you guessed it) classifies things. 

Let’s put it in more concrete terms: We want to teach the computer to answer the question, “**What kind of fruit is this?**”

You're the owner of an orchard, and you're tired of paying workers to sort your fruits on the assembly line. The job is boring, the workers hate it, and you already measure the weight and color of every fruit on the line anyway. It should be simple enough to have a machine do it.

You have a set of already classified (categorized, tagged, etc)  information - and you want to automatically figure out where new data (fruits) fits into your classification automatically. i.e., Is it an Apple or a Banana?

Here’s some fruit the workers logged before they got shit-canned:

```
     --------------------------------------------
    |  weight (g)  |   color  ||  Type of fruit  |
    |==============|==========||=================|
    |  303         |  3       ||  Banana         |
    |  370         |  1       ||  Apple          |
    |  298         |  3       ||  Banana         |
    |  277         |  3       ||  Banana         |
    |  377         |  4       ||  Apple          |
    |  299         |  3       ||  Banana         |
    |  382         |  1       ||  Apple          |
    |  374         |  4       ||  Apple          |
    |  303         |  4       ||  Banana         |
    |  309         |  3       ||  Banana         |
    |  359         |  1       ||  Apple          |
    |  366         |  1       ||  Apple          |
    |  311         |  3       ||  Banana         |
    |  302         |  3       ||  Banana         |
    |  373         |  4       ||  Apple          |
    |  305         |  3       ||  Banana         |
    |  371         |  3       ||  Apple          |
     --------------------------------------------
```

Notice they assigned numbers to the colors, that’s useful because we need to do math with these values (numbering non-numerical stuff is known as [discretizing][1]). The colors are in order of the color wheel, so similar colors *are* closer together than less similar colors. 

Here’s the color key from the foreman’s clipboard:

```
          red         1
          orange      2
          yellow      3
          green       4
          blue        5
          purple      6
```

So our data set has some apples which are red, green, and yellow, and a bunch of bananas which are all yellow except one that is green.

It’s 9 AM.

A loud bell rings.

The conveyor belt starts turning, and fruit starts flowing in from outside. 

But the factory is empty. All our factory workers are home learning to maintain fruit classifying robots and re-reading the [primitive accumulation of wealth](http://www.marxists.org/archive/marx/works/1867-c1/ch32.htm).

…and the first fruit rolls onto the classification machine.
 
What is this thing?

```   
    Weight:  373g
    color:   1 (red)
```

We better write some software to handle that fruit before it rots!

How do we decide whether this unknown fruit is an apple or banana? 
    
The K-nearest-neighbor approach is to calculate the distance between our unknown fruit and each of the known fruits and assume the “k” closest fruits are probably the same type of fruit.

Sort of like graphing all the fruits and drawing a circle around the “?”. Whatever is closest to it is probably the same kind of fruit.

```
                   Graph of Fruits
             |
             |            
         380 |   AA      AA       
    weight   |   A?      A  A
         330 |       A    B B
             |           BB BB     
         280 |            
             |__________________________
                 1   2   3   4   5   6              
                        color

        note: the question mark is the “unknown fruit”
```

## Math is delicious

Before we can start with the KNN algorithm, we need to do a little math review. Remember good old pythagorus? a² + b² = c² right? If you're comfortable with this, just [skip to the next section](#ok_back_to_knn).

If you don't remember: this is the formula for calculating the hypotenous (see: the diagonal side) of a right triangle.

```
         J
        | \
        |  \    
     7  |   \   ⟵  this side == (5**2 + 7**2) **0.5
        |    \   
         -----
           5    K
```

You could also say “longitude” instead of “height”, “latitude” instead of “width” and say you're calculating the “distance“ from point “J“ to point “K". 

That part is crucial. 

Well the real world isn't 2D, it'd 3D, but I have great news! You can do this in 3D too. So now we can calculate distances in a 3D space the same way:

{% highlight python %}
    a**2 + b**2 + c**2 == d**2
{% endhighlight %}
    
or...

{% highlight python %}
    d ==  (a**2 + b**2 + c**2) **0.5
{% endhighlight %}

aside: raising something to the .5 power (i.e., `**0.5`) is the same as taking the square root.

With KNN you can actually have as many dimensions as you want, but to keep it simple, we'll just use 2.

## OK, back to KNN

So this is what a function would look like that tells us the distance from our unknown fruit to one of the known fruits in our dataset

{% highlight python %}
def distance(fruit1, fruit2):
    """
    The args are iterables of the values in the table. 
    for example the args should look something like this:
    
    #         weight,  color
    fruit1 = [303,     3]  # Banana from the data set
    fruit2 = [373,     1]  # the unclassified fruit
    """
    
    # first let's get the distance of each parameter
    a = fruit1[0] - fruit2[0]
    b = fruit1[1] - fruit2[1]
    
    # the distance from point A (fruit1) to point B (fruit2)
    c = (a**2 + b**2) **0.5
    
    return c
{% endhighlight %}

Here is the python representations of the stuff we've discussed so far:
    
{% highlight python %}
# the unknown fruit from above
unknown_fruit = [373, 1]

# This is arbitrarily chosen for this example. Generally
# you need to play with this magic number to find what works
# best for your case.
k = 3

# here's the dataset as a python list…
dataset = [
  # weight, color, type
  [303, 3, "banana"],
  [370, 1, "apple"],
  [298, 3, "banana"],
  [277, 3, "banana"],
  [377, 4, "apple"],
  [299, 3, "banana"],
  [382, 1, "apple"],
  [374, 4, "apple"],
  [303, 4, "banana"],
  [309, 3, "banana"],
  [359, 1, "apple"],
  [366, 1, "apple"],
  [311, 3, "banana"],
  [302, 3, "banana"],
  [373, 4, "apple"],
  [305, 3, "banana"],
  [371, 3, "apple"],
]
{% endhighlight %}    

…and with that being said, let’s sort the dataset using this function…

{% highlight python %}
# using the distance() function from above, sort
# the data set by smallest distances on top
sorted_dataset = sorted(dataset, key=lambda fruit: distance(fruit, unknown_fruit))
{% endhighlight %}

Here is the table of distances from our unknown fruit to the known fruits in the data set.

```
        --------------------------------------------
       |  weight (g)  |   color  ||  Type of fruit  |  distance
       |==============|==========||=================|
       |  371         |  3       ||  Apple          |   2.8
       |  370         |  1       ||  Apple          |   3.0
       |  373         |  4       ||  Apple          |   3.0
        \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/  
       
       |  374         |  4       ||  Apple          |   3.2
       |  377         |  4       ||  Apple          |   5.0
       |  366         |  1       ||  Apple          |   7.0
       |  382         |  1       ||  Apple          |   9.0
       |  359         |  1       ||  Apple          |  14.0
       |  311         |  3       ||  Banana         |  62.0
       |  309         |  3       ||  Banana         |  64.0
       |  305         |  3       ||  Banana         |  68.0
       |  303         |  3       ||  Banana         |  70.0
       |  303         |  4       ||  Banana         |  70.1
       |  302         |  3       ||  Banana         |  71.0
       |  299         |  3       ||  Banana         |  74.0
       |  298         |  3       ||  Banana         |  75.0
       |  277         |  3       ||  Banana         |  96.0
        --------------------------------------------
```

At this point, which classification the unknown fruit belongs to is determined by taking a vote of the “k“ nearest neighbors – so if “k“ is 3, then we take the top 3 fruits by distance and select whichever is most common.

{% highlight python %}
# from the python std library
from collections import Counter

# take only the first K items
top_k = sorted_dataset[:k]

class_counts = Counter(fruit for (weight, color, fruit) in top_k)

# class_counts now looks like this:
# {"apple": 3}
   
# get the class with the most votes
classification = max(class_counts, key=lambda cls: class_counts[cls])

# There you have it!
classification == "apple"
{% endhighlight %}      
  
In this case we see that the top 3 are all “Apple“ so we conclude this unknown fruit must be an apple.

You can expand this to more more than two features though. You can actually use that distance formula from earlier with as many dimensions as you want.

Let’s try it with 4:

{% highlight python %}
    e == (a**2 + b**2 + c**2 + d**2) **0.5
{% endhighlight %}

So if we'd done this using more characteristics of the fruits than just weight and color (like number of seeds in the fruit for instance), the distance calculation (we have 3 factors now) would have just been:

{% highlight python %}    
#         weight, color, seeds
fruit1 = [303,    3,     1]  # Banana from the data set
fruit2 = [297,    1,     4]  # unknown (but it's an apple)

a = fruit1[0] - fruit2[0]
b = fruit1[1] - fruit2[1]
c = fruit1[2] - fruit2[2]

distance = (a**2 + b**2 + c**2) **0.5
{% endhighlight %}

> You: **This is repetitive**

True. This code is designed to make it easy to understand… in real life, you should use numpy (or similar) for performance reasons anyway (ML is very computationally expensive).

> You: **What if one factor is more important than the others?**

That’s a really good point. Maybe the number of seeds is **much** more important than the color of the fruit ([it is][3]), but color is still an important differentiator among fruits with the same number of seeds?

## Neutralizing the effects of different units

Right now your weight values are much bigger than our color ones, which we've discretized to single digit numbers.

That means weight is causing much bigger changes in distance between fruits than color is.

What are we going to do about that?

Well, what if we measure all our inputs on a scale of 0 - 1.0?

## That’s Normalization Kyle!

In short, we're going to take the *biggest value in the dataset* and the *smallest value in the dataset* and put all the other numbers on a scale of 0.0 - 1.0 from smallest to biggest.

    Biggest fruit:   382g
    Smallest fruit:  277g
    range = 382-277 = 105

{% highlight python %}
def normalize_weight(weight):
    # convert the units to a float so python's wonky
    # division doesn't break anything later on
    weight = float(weight)

    # first subtract 277 (the smallest weight)
    # so that the smallest fruit becomes 0.0
    x = weight - 277

    # now the biggest fruit is 105 (382-277), but
    # we want the biggest fruit to become 1.0 so 
    # let's divide!
    x = x / 105

    return x
{% endhighlight %}

Obviously you wouldn't hard-code those numbers (largest/smallest weight) in real life. Again, just for clarity.

You can do the same approach with the colors, number of seeds, etc.

If you're going to normalize your dataset, you have to normalize *all the columns*. Otherwise you're not doing what you think you are.

### Wait, but I thought we mainly cared about seeds?

Right. So once you've done this, let’s say you want number of seeds to be twice as important as weight and color to be half as important as weight.

You'd just multiply the “number of seeds“ value for every fruit in your dataset by 2.0, and multiply the “color“ value of every fruit in your dataset by 0.5. Try calculating the weights now.

These are magic numbers that (like the K value) need to be tested and tweaked to see what will work best for you.

## HOMEWORK:

I'm going to leave it as an exercise to the reader to apply these ideas (dataset follows):
 
 1. Write a distance function that will accept 3 columns of data instead of 2
 2. Normalize the `Color`, `Weight`, and `# of Seeds` columns of the dataset
 3. Apply weights to the columns:
    - Color is least important: give it a weight of 0.5
    - Weight is a good differentiator: give it a weight of 1.0
    - `# of Seeds` is most important: give it a weight of 2.0
 4. Classify these 3 unknown fruits (UFs) using your classifier

    - UF1: [color: green, weight: 301g, seeds: 1]
    - UF2: [color: yellow, weight: 346g, seeds: 4]
    - UF3: [color: red, weight: 290g, seeds: 2]

dataset:

```
     -------------------------------------------------------
    |  weight (g)  |  color  |  # seeds  ||  Type of fruit  |
    |==============|=========|===========||=================|
    |  303         |  3      |  1        ||  Banana         |
    |  370         |  1      |  2        ||  Apple          |
    |  298         |  3      |  1        ||  Banana         |
    |  277         |  3      |  1        ||  Banana         |
    |  377         |  4      |  2        ||  Apple          |
    |  299         |  3      |  1        ||  Banana         |
    |  382         |  1      |  2        ||  Apple          |
    |  374         |  4      |  6        ||  Apple          |
    |  303         |  4      |  1        ||  Banana         |
    |  309         |  3      |  1        ||  Banana         |
    |  359         |  1      |  2        ||  Apple          |
    |  366         |  1      |  4        ||  Apple          |
    |  311         |  3      |  1        ||  Banana         |
    |  302         |  3      |  1        ||  Banana         |
    |  373         |  4      |  4        ||  Apple          |
    |  305         |  3      |  1        ||  Banana         |
    |  371         |  3      |  6        ||  Apple          |
     -------------------------------------------------------
```

as python:

{% highlight python %}
dataset = [
  # weight, color, # seeds, type
  [303, 3, 1, "banana"],
  [370, 1, 2, "apple"],
  [298, 3, 1, "banana"],
  [277, 3, 1, "banana"],
  [377, 4, 2, "apple"],
  [299, 3, 1, "banana"],
  [382, 1, 2, "apple"],
  [374, 4, 6, "apple"],
  [303, 4, 1, "banana"],
  [309, 3, 1, "banana"],
  [359, 1, 2, "apple"],
  [366, 1, 4, "apple"],
  [311, 3, 1, "banana"],
  [302, 3, 1, "banana"],
  [373, 4, 4, "apple"],
  [305, 3, 1, "banana"],
  [371, 3, 6, "apple"],
]
{% endhighlight %}

After you've classified the 3 Unknown Fruits, consider which columns you could remove without losing any accuracy. It’s often the case that simpler classifiers are better, and the facets of your data may not be as related as you originally thought!

---

This is my first crack at this type of tutorial, so please give me feedback, and/or corrections! (email: [blog@jiaaro.com](mailto:blog@jiaaro.com) )

[1]: http://en.wiktionary.org/wiki/discretization
[2]: http://amzn.to/16UaKU2
[3]: http://www.mainstreettrees.com/apples/
[4]: /img/MLIA.jpg
