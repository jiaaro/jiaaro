--- 
layout: post
title: Decoding facebook's base64url signed_request
published: true
---

In python:

{% highlight python %}
import base64

def signed_request_to_json(s):
    sig, encoded_json = s.split(".",2)
    encoded_json += (len(encoded_json) % 4) * "="
    return {
        'sig': sig,
        'json': base64.b64decode(encoded_json)
    }
{% endhighlight %}
