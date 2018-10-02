"use strict";

function embedPathwayMap(data) {
  let options = {
    menu: "zoom",
    enable_editing: false
  };
  escher.Builder(data, null, null, d3.select("#map_container"), options);
}

function onShowDemo() {
  clearStatistics();
  d3.json("demo.json", function(error, data) {
    if (error) console.warn(error);
    embedPathwayMap(data);
    getStatistics(data);
  });
}

function clearStatistics() {
  let div = document.getElementById("statistics");
  let tables = div.querySelectorAll("table");
  for (let table of tables) {
    div.removeChild(table);
  }
}

function displayStatistics(data, th1Text, th2Text) {
  let table = document.createElement("table");
  let types = Object.keys(data);
  let tr = document.createElement("tr");
  let th1 = document.createElement("th");
  let th2 = document.createElement("th");
  let text1 = document.createTextNode(th1Text);
  let text2 = document.createTextNode(th2Text);
  th1.appendChild(text1);
  th2.appendChild(text2);
  tr.appendChild(th1);
  tr.appendChild(th2);
  table.appendChild(tr);
  for (let type of types) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let text1 = document.createTextNode(type);
    let text2 = document.createTextNode(data[type]);
    td1.appendChild(text1);
    td2.appendChild(text2);
    tr.appendChild(td1);
    tr.appendChild(td2);
    table.appendChild(tr);
  }
  document.getElementById("statistics").appendChild(table);
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
  displayStatistics(nodeTypes, "Node type", "Number of nodes");

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
  displayStatistics(genes, "Gene name", "Number of reactions");
}

function handleFileSelect(evt) {
  clearStatistics();
  let file = evt.target.files[0];
  let reader = new FileReader();

  reader.onload = function(e) {
    let data = JSON.parse(e.target.result);
    embedPathwayMap(data);
    getStatistics(data);
  };

  reader.readAsText(file);
}

function handleThemeChange(evt) {
  document.body.className = evt.target.value;
}

function main() {
  embedPathwayMap(null);
  document.getElementById("show_demo").onclick = onShowDemo;
  document
    .getElementById("theme_selector")
    .addEventListener("change", handleThemeChange);
  document
    .getElementById("file_selector")
    .addEventListener("change", handleFileSelect);
}

main();
