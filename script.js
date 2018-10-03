"use strict";

function embedPathwayMap(data) {
  escher.Builder(data, null, null, document.getElementById("map_container"), {
    menu: "zoom",
    enable_editing: false
  });
}

function loadFile(text) {
  try {
    let data = JSON.parse(text);
    embedPathwayMap(data);
    getStatistics(data);
    document.getElementById("load_error").className = "";
  } catch (err) {
    console.error("Unable to load file: ", err);
    document.getElementById("load_error").className = "visible";
  }
}

function handleShowDemo() {
  let client = new XMLHttpRequest();
  client.open("GET", "demo.json");
  client.onload = function() {
    loadFile(client.responseText);
  };
  client.send();
}

function handleFileSelect(evt) {
  let file = evt.target.files[0];
  let reader = new FileReader();

  reader.onload = function(e) {
    loadFile(e.target.result);
  };

  reader.readAsText(file);
}

function handleThemeChange(evt) {
  document.body.className = evt.target.value;
}

function clearStatistics() {
  let container = document.getElementById("statistics_container");
  while (container.firstChild) {
    container.removeChild(container.firstChild);
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
  document.getElementById("statistics_container").appendChild(table);
}

function getStatistics(data) {
  clearStatistics();

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
    for (let geneInReaction of reaction.genes) {
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

function main() {
  embedPathwayMap(null);
  document
    .getElementById("show_demo")
    .addEventListener("click", handleShowDemo);
  document
    .getElementById("theme_selector")
    .addEventListener("change", handleThemeChange);
  document
    .getElementById("file_selector")
    .addEventListener("change", handleFileSelect);
}

main();
