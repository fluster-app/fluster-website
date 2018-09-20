# Fluster goes Open Source
### The motivations and technical facts behind it
![](/assets/blog/img/editor/david.jpg?raw=true) Posted by [David](mailto:david@fluster.io), Founder of Fluster, on September 12, 2018

![](/assets/blog/img/post/fluster-open-source.gif?raw=true)

I thought about it quite a lot the past few months, it took me a while to get ready, but after two years of building my project **[Fluster](https://fluster.io)** closely, I have decided to fully open-source my startup and this effectively as of now by releasing my mobile and progressive web app on [GitHub](https://github.com/fluster/fluster-app) 🎉

### What’s Fluster?

Fluster is the clever marketplace for flatshares with plenty of unique features which makes life easier. I had the idea of the application two years ago when I moved to Zürich because finding a home and roommates was just a frustrating experience to me and it just felt like a huge lost of time. That’s why I’ve developed Fluster with my own two hands to solve the problems I faced.

### My motivations

I do not really think that I have to justify myself, however, here what would be my answers to questions regarding my motivations:

* How are you going to make money? First of all, at this point, Fluster is free and no, I don’t think that open-sourcing my project is conflicting with my business plan
* Couldn’t someone copy your app? Of course, but reverse engineering isn’t always such a money and quality gain. Furthermore, my platform will be released under the GNU Affero General Public License which means that legally, who would copy my platform, would have to open-source its platform too
* But could this move prevents a possible sell out? Yes probably  but this has never been my goal and, to be honest, I’m even a bit sceptical on that particular subject
* What are your motivations then? The older I become the more I become interesting by the community topic. It may sound cheesy but by open-sourcing the platform and by looking to have a more open communication, I hope that I will become closer to the Fluster community and by extension, that I and Fluster are going to improve
* Are you really sure? Yes am I, it’s what my gut feeling tells me to do. Furthermore, having the ability to use a transparent and open platform is just the kind of app I am looking for to use

### Architecture stack

Fluster is a mobile application available in the [App Store](https://itunes.apple.com/app/id1187266720) and [Google Play](https://play.google.com/store/apps/details?id=io.fluster.fluster) and a [Progressive Web App](https://m.fluster.io) build with [Ionic](https://play.google.com/store/apps/details?id=io.fluster.fluster), [Angular](http://angular.io) and [Cordova](https://cordova.apache.org). It’s also an Angular Universal (SSR) website, a [NodeJS](http://nodejs.org) backend and a [MongoDB](http://mongodb.com) hosted at [Amazon AWS](https://aws.amazon.com/).

Fluster uses a couple of third party services, notably Branch, Facebook, Google Plus, Google Analytics, Geolocation and Places, Sentry, Spotify and Yelp.

*Note: The website and backend aren’t open sourced yet, these releases will follow in the next upcoming weeks*

#### By numbers

Neither too much nor not enough lines of code describe the quality of a software, I’m agree with you, however I just thought that displaying some numbers about the platform would explain better than words the effort I’m about to publish.

At the time I was writing these lines, according [cloc](https://github.com/AlDanial/cloc), Fluster includes 29’921 Typescript and Javascript code lines, 6’673 lines in stylesheets and 4’589 lines in templates.

The server API exposes 97 different routes to the mobile app and pwa which consists of 68 components, 51 providers, 20 pages, 16 modals, 5 pipes and 1 directive (I know, what could I say, I’m not that a pipes and directives guy 😂).

Beside these, used in my project, I also already had released under MIT license one angular component, [ionic-swing](https://github.com/fluster/ionic-swing) which is the component for the Tinder-like cards, and two web components, [web-photo-filter](https://github.com/fluster/web-photo-filter) for Instagram-like filters and [web-social-shar](https://github.com/fluster/web-social-share)e to handle the social sharing in pwa.

### Cherry on the cake 🍒🎂

Beside this release I also spent the past weeks migrating my app to **Ionic v4** and I’m so happy with the results, that I have decided to publish nothing else that this brand new, and fully migrated, awesome version of my app 🚀

To infinity and beyond, bisou 😃

David

<br> 

*P.S.: If you missed the link to the repo at the begin of the article, here again the link to my mobile and progressive web app on *[GitHub](https://github.com/fluster/fluster-app) 🖖
