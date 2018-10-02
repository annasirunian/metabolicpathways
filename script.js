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

function getStatistics(data) {
  // Nodes statistics
  let nodeTypes = {};
  let nodes = Object.values(data[1].nodes);
  for (let node of nodes) {
    let nodeType = node.node_type;
    if (!(nodeType in nodeTypes)) {
      nodeTypes[nodeType] = 0;
    }
    nodeTypes[nodeType]++;
  }

  // Genes statistics
  let genes = {};
  let reactions = Object.values(data[1].reactions);
  for (let reaction of reactions) {
    let genesInReaction = reaction.genes;
    for (let geneInReaction of genesInReaction) {
      let gene = geneInReaction.name;
      if (!(gene in genes)) {
        genes[gene] = 0;
      }
      genes[gene]++;
    }
  }

  let geneNames = Object.keys(genes);
  for (let name of geneNames) {
    if (genes[name] <= 1) {
      delete genes[name];
    }
  }
}

function handleFileSelect(evt) {
  let file = evt.target.files[0];
  let reader = new FileReader();

  reader.onload = function(e) {
    let data = JSON.parse(e.target.result);
    embedPathwayMap(data);
    getStatistics(data);
  };

  reader.readAsText(file);
}

function main() {
  embedPathwayMap(null);
  document.getElementById("show_demo").onclick = onShowDemo;
  document.getElementById("file").addEventListener("change", handleFileSelect);
}

main();
