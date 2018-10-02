"use strict";

function embedPathwayMap(data) {
  let options = {
    menu: "zoom",
    //fill_screen: true,
    enable_editing: false
  };
  escher.Builder(data, null, null, d3.select("#map_container"), options);
}

function onShowDemo() {
  d3.json("demo.json", function(error, data) {
    if (error) console.warn(error);
    embedPathwayMap(data);
  });
}

function main() {
  embedPathwayMap(null);
  document.getElementById("show_demo").onclick = onShowDemo;
}

main();
