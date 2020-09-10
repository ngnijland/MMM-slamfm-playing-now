# MMM-slamfm-playing-now

A Magic Mirror module which show what's currently playing now on the dutch radio station Slam!

![Screenshot of module](https://github.com/ngnijland/MMM-slamfm-playing-now/raw/master/screenshots/MMM-slamfm-playing-now-screenshot.png)


## Installation

1. Go to the MagicMirror modules folder

```bash
cd ~/MagicMirror/modules
```

2. Clone this repository

```bash
git clone https://github.com/ngnijland/MMM-slamfm-playing-now.git
```

3. Add the this module to the modules array in the MagicMirror `config/config.js` file, like this:

```javascript
modules: [
  {
    module: "MMM-slamfm-playing-now",
    position: "bottom_left"
  }
]
```

## Configuration

Configure this module in your MagicMirror config file which is located at `config/config.js` in the MagicMirror repository. An example config for this module:

```javascript
modules: [
  {
    module: "MMM-social-counter",
    position: "middle_center",
    config: {
      // Options
    }
  }
]
```

The following configurations are available:

Config                | Type                       | Default value | Description
:---------------------|:---------------------------|:--------------|:------------
`updatesEvery`        | `number`                   | `10`          | The amount of seconds between each update
