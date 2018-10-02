"use strict";

function embedPathwayMap(data) {
  let options = {
    menu: "zoom",
    //fill_screen: true,
    enable_editing: false
  };
  escher.Builder(data, null, null, d3.select("#map_container"), options);
}

function main() {
  embedPathwayMap(null);
}

main();
