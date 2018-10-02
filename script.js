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

function handleFileSelect(evt) {
  let file = evt.target.files[0];
  let reader = new FileReader();

  reader.onload = function(e) {
    let data = JSON.parse(e.target.result);
    embedPathwayMap(data);
  };

  reader.readAsText(file);
}

function main() {
  embedPathwayMap(null);
  document.getElementById("show_demo").onclick = onShowDemo;
  document.getElementById("file").addEventListener("change", handleFileSelect);
}

main();
