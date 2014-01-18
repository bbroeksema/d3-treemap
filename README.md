# Generic Treemap layout algorithm

This is a generic layout algorithm for treemaps, or more general spacefilling rectangular layouts.
It is a JavaScript implementation of the algorithm described [this](http://research.broeksemaatjes.nl/publications/2012-capturing-design-space-sequential-space-filling-layouts.pdf) paper.

See [here]() for an interactive
demonstration along with implementation details.

## Usage

See the samples in `examples/`.

This layout requires [D3](http://mbostock.github.com/d3/) and replaces 
[d3.layout.treemap](https://github.com/mbostock/d3/wiki/Treemap-Layout#wiki-treemap).
It does provide the same API for backwards compatibility and the default configuration resembles the one in d3.