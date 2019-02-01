(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3')) :
  typeof define === 'function' && define.amd ? define(['exports', 'd3'], factory) :
  (factory((global.dbox = {}),global.d3));
}(this, (function (exports,d3) { 'use strict';

  /*
   * Simple Layer Chart
   */

  function layerPlainD3 () {
    // Link Layer to the helper object in helper.js
    const Layer = {};

    Layer.config = function config() {
      const vm = this;
      vm.margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
      };
      vm.width = 960 - vm.margin.left - vm.margin.right;
      vm.height = 500 - vm.margin.top - vm.margin.bottom;
      vm.scales();
    };

    Layer.scales = function scales() {
      const vm = this;
      vm.x = d3.scaleBand().range([0, vm.width]).padding(0.1);
      vm.y = d3.scaleLinear().range([vm.height, 0]);
    };

    Layer.chart = function chart() {
      const vm = this; // append the svg object to the body of the page
      // append a 'group' element to 'svg'
      // moves the 'group' element to the top left margin

      const svg = d3.select('body').append('svg').attr('width', vm.width + vm.margin.left + vm.margin.right).attr('height', vm.height + vm.margin.top + vm.margin.bottom).append('g').attr('transform', `translate(${vm.margin.left}, ${vm.margin.top})`);
      return svg;
    };

    Layer.data = function data(dat) {
      const vm = this; // format the data

      dat.forEach(d => {
        d.y = +d.y;
      });
      vm._data = dat; // Scale the range of the data in the domains

      vm.x.domain(dat.map(d => d.x));
      vm.y.domain([0, d3.max(dat, d => d.y)]);
      vm.draw();
    };

    Layer.draw = function draw() {
      const vm = this; // append the rectangles for the bar chart

      const svg = vm.chart();
      svg.selectAll('.bar').data(vm._data).enter().append('rect').attr('class', 'bar').attr('x', d => vm.x(d.x)).attr('width', vm.x.bandwidth()).attr('y', d => vm.y(d.y)).attr('height', d => vm.height - vm.y(d.y)); // add the x Axis

      vm.svg.append('g').attr('transform', `translate(0,${vm.height})`).call(d3.axisBottom(vm.x)); // add the y Axis

      vm.svg.append('g').call(d3.axisLeft(vm.y));
    };

    Layer.config();
    return Layer;
  }

  /*
   * Dboxjs
   *
   * You can import other modules here, including external packages. When
   * bundling using rollup you can mark those modules as external and have them
   * excluded or, if they have a jsnext:main entry in their package.json (like
   * this package does), let rollup bundle them into your dist file.
   */

  exports.layer = layerPlainD3;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=dbox.js.map
