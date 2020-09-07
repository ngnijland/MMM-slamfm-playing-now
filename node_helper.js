const https = require('https');
const NodeHelper = require('node_helper');

module.exports = NodeHelper.create({
  socketNotificationReceived: function (notification, payload) {
    switch (notification) {
      case 'GET_PLAYING_NOW': {
        this.getPlayingNow();
        break;
      }
      default: {
        this.sendSocketNotification(
          'ERROR',
          `Socket notification error: Unknown notification "${notification}" received from module. Please submit an issue in the MMM-slamfm-playing-now repository.`
        );
      }
    }
  },

  getPlayingNow: function () {
    https
      .get('https://api.slam.nl/api/live?brand=slam', (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          const response = JSON.parse(data);

          if (response && response.success === 1) {
            this.sendSocketNotification('PLAYING_NOW', response.data);
          } else {
            this.sendSocketNotification('ERROR', 'Playing now request failed.');
          }
        });
      })
      .on('error', (error) => {
        this.sendSocketNotification('ERROR', error.message);
      });
  },
});
