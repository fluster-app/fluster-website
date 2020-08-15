**[NOT MAINTAINED]** This project is discontinued.

<h1 align="center">Fluster</h1>

<p align="center">
  Roommates next door
</p>

<p align="center">
  <a href="https://fluster.io/">
    <img alt="Fluster" title="Fluster" src="https://github.com/fluster/fluster-app/blob/master/resources/pwa/assets/icon/android-chrome-512x512.png" width="450">
  </a>
</p>

<p align="center">
  <a href="https://itunes.apple.com/app/id1187266720">
    <img alt="Download on the App Store" title="App Store" src="https://fluster.io/assets/images/store/app-store-badge-en.svg" height="48px">
  </a>

  <a href="http://play.google.com/store/apps/details?id=io.fluster.fluster">
    <img alt="Get it on Google Play" title="Google Play" src="https://fluster.io/assets/images/store/google-play-badge-en.png" height="48px">
  </a>

  <a href="https://m.fluster.io">
    <img alt="Launch now as a PWA" title="PWA" src="https://user-images.githubusercontent.com/9122190/28998409-c5bf7362-7a00-11e7-9b63-db56694522e7.png" height="48px">
  </a>
  
</p>

## Introduction

Fluster is a platform which aims to simplify the search for roommates and flatshares by using smart features 😃🎉

This repo is the Fluster's website, build with [Angular](http://angular.io).

### Features

A few of the things Fluster offers:

* Fluster recommends you flatshares fitting your needs
* With Fluster, you could discover what are the lifestyle and hobbies of your future roommates
* You like a place on Fluster? You could send instant viewing requests
* Fluster take care of the calendar of your viewings
* Fluster is free, open source and even publishing an ad about your room to let is free too

## Server-side rendering (SSR)

This Angular application runs on the server. It follows the architecture of the [Angular Universal starter kit](https://github.com/angular/universal-starter). 

## Getting Started

Once you have cloned this repository and if you are looking to serve or build the application, you will have first to define your own third party keys in `resources.ts`.

Also note, both staging and prod builds are going to run first `Gulp` scripts in order to modify some html files because the staging environment should not be indexed by crawlers. 

### Debug locally

Serve the application locally:

```bash
npm run start
```

### Build for staging

Build the application for the staging server:

```bash
npm run build:ssr-staging
```

### Build for production

Build the application for the production:

```bash
npm run build:ssr
```

### Run staging or prod build

Run the application:

```bash
npm run serve
```

## Feedback

Feel free to send me feedback on [Twitter](https://twitter.com/daviddalbusco) or [file an issue](https://github.com/fluster/fluster-app/issues/new). Feature requests are always welcome.

## Social

Follow Fluster on [Twitter](https://twitter.com/flusterapp) or [Instagram](http://instagram.com/fluster.io/).

## License

Fluster is released under the GNU Affero General Public License. Copyright Fluster GmbH, Zürich, Switzerland. See COPYING for more details.

Fluster is developed by David Dal Busco.

The Fluster logo is a registered trademark of David Dal Busco, Zürich, Switzerland. Please contact [me](mailto:david@fluster.io) if you want to use it.

The licence of several stock photos, notably used in the Fluster's blog, restricts their usage to David Dal Busco, Zürich, Switzerland.
