/* global Module */

/* Magic Mirror
 * Module: MMM-slamfm-playing-now
 *
 * By Niek Nijland <ngnijland@gmail.com>
 * MIT Licensed.
 */

Module.register('MMM-slamfm-playing-now', {
  defaults: {
    updatesEvery: 10,
  },

  start: function () {
    Log.info(`Starting module: ${this.name}`);

    this.interval;
    this.updatesEvery = this.config.updatesEvery;
    this.status = 'LOADING';
    this.nowPlaying;

    if (typeof this.updatesEvery !== 'number') {
      Log.error(
        `Configuration error: "updatesEvery" should be a number, but is: "${this.updatesEvery}". Falling back to 1.`
      );
      this.updatesEvery = 1;
    } else if (this.updatesEvery < 1) {
      Log.error(
        `Configuration error: "updatesEvery" should be higher than 1, but is: "${this.updatesEvery}". Falling back to 1.`
      );
      this.updatesEvery = 1;
    }

    this.startInterval();
  },

  startInterval: function () {
    clearInterval(this.interval);

    this.sendSocketNotification('GET_PLAYING_NOW');

    this.interval = setInterval(() => {
      this.sendSocketNotification('GET_PLAYING_NOW');
    }, this.updatesEvery * 1000);
  },

  socketNotificationReceived: function (notification, payload) {
    switch (notification) {
      case 'PLAYING_NOW': {
        this.status = 'SUCCESS';
        this.nowPlaying = payload;
        this.updateDom();
        break;
      }
      case 'ERROR': {
        this.status = 'ERROR';
        this.error = payload;
        this.updateDom();
        break;
      }
      default: {
        this.status = 'ERROR';
        this.error = `Socket notivication error: Unknown notification "${notification}" received from node_helper. Please submit an issue in the MMM-slamfm-playing-now repository.`;
        this.updateDom();
      }
    }
  },

  getDom: function () {
    const text = document.createElement('span');

    if (this.status === 'LOADING') {
      text.textContent = 'Loading...';

      return text;
    }

    if (this.status === 'ERROR') {
      Log.error(this.error);

      text.textContent = this.error;

      return text;
    }

    text.textContent = `${this.nowPlaying.song.artist} - ${this.nowPlaying.song.title}`;

    return text;
  },
});
