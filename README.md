# Visualization of metabolic pathways

This app is intended to visualize the metabolic pathways maps with the help of [Escher library](https://escher.readthedocs.io/en/stable/).

The app allows to load pathway maps from the file system, visualizes it and displays basic statistics.

## Demo

To see the app in action, visit [the following link](https://metabolicpathways.z6.web.core.windows.net/).

It is deployed on Azure as a static website.

## Running locally

To get started, clone this repository:

```
git clone https://github.com/annasirunian/metabolicpathways
```

Then start a web server in the project directory using one of the options:

```
python -m http.server        # Python 3

python -m SimpleHTTPServer   # Python 2

http-server -p 8000          # Node.js, using http-server library
```

Finally navigate to [localhost:8000](http://localhost:8000).
