/* global Module */

/* Magic Mirror
 * Module: MMM-slamfm-playing-now
 *
 * By Niek Nijland <ngnijland@gmail.com>
 * MIT Licensed.
 */

Module.register('MMM-slamfm-playing-now', {
  start: function () {
    Log.info(`Starting module: ${this.name}`);

    this.updateDom();
  },

  getDom: function () {
    const text = document.createElement('span');
    text.textContent = 'Hello world';

    return text;
  },
});
