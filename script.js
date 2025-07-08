class HuffmanNode {
  constructor(char, frequency, left = null, right = null) {
    this.char = char;
    this.frequency = frequency;
    this.left = left;
    this.right = right;
  }
}

let huffmanTreeRoot = null;

function huffmanCoding(text) {
  if (!text) return null;

  const freqMap = {};
  for (const char of text) {
    freqMap[char] = (freqMap[char] || 0) + 1;
  }

  const priorityQueue = Object.entries(freqMap).map(
    ([char, freq]) => new HuffmanNode(char, freq)
  );

  const sortQueue = () =>
    priorityQueue.sort((a, b) => a.frequency - b.frequency);

  if (priorityQueue.length === 1) {
    const single = priorityQueue[0];
    priorityQueue.push(new HuffmanNode(null, single.frequency, single, null));
  }

  while (priorityQueue.length > 1) {
    sortQueue();
    const left = priorityQueue.shift();
    const right = priorityQueue.shift();
    const parent = new HuffmanNode(
      null,
      left.frequency + right.frequency,
      left,
      right
    );
    priorityQueue.push(parent);
  }

  const root = priorityQueue[0];
  const huffmanCodes = {};

  const generateCodes = (node, code = "") => {
    if (!node) return;
    if (node.char !== null) {
      huffmanCodes[node.char] = code || "0";
      return;
    }
    generateCodes(node.left, code + "0");
    generateCodes(node.right, code + "1");
  };

  generateCodes(root);

  const encodedString = [...text].map((char) => huffmanCodes[char]).join("");
  return { huffmanCodes, encodedString, root };
}

function huffmanDecompression(encodedString, treeRoot) {
  if (!encodedString || !treeRoot) return "";

  let decoded = "",
    current = treeRoot;
  for (const bit of encodedString) {
    current = bit === "0" ? current.left : current.right;
    if (current.char !== null) {
      decoded += current.char;
      current = treeRoot;
    }
  }
  return decoded;
}

// --- Draw Huffman Tree ---
function drawTree(node, parentElement) {
  if (!node) return;

  const nodeDiv = document.createElement("div");
  nodeDiv.classList.add("tree-node");

  const content = document.createElement("div");
  content.classList.add("tree-node-circle");

  if (node.char) {
    const displayChar = node.char === " " ? "' '" : node.char;
    content.innerHTML = `<span class="char">${displayChar}</span>${node.frequency}`;
  } else {
    content.textContent = node.frequency;
  }

  nodeDiv.appendChild(content);

  if (node.left || node.right) {
    const childrenContainer = document.createElement("div");
    childrenContainer.classList.add("node-children");
    drawTree(node.left, childrenContainer);
    drawTree(node.right, childrenContainer);
    nodeDiv.appendChild(childrenContainer);
  }

  parentElement.appendChild(nodeDiv);
}

// --- DOM References ---
const textInput = document.getElementById("text-input");
const compressBtn = document.getElementById("compress-btn");
const decompressBtn = document.getElementById("decompress-btn");
const fileInput = document.getElementById("file-input");
const downloadBtn = document.getElementById("download-btn");

// --- Compress ---
compressBtn.addEventListener("click", () => {
  const text = textInput.value.trim();
  if (!text) return alert("Please enter some text to compress.");

  const result = huffmanCoding(text);
  if (!result) return;

  huffmanTreeRoot = result.root;
  const { huffmanCodes, encodedString } = result;

  // Stats
  const originalSize = text.length * 8;
  const compressedSize = encodedString.length;
  const ratio = ((1 - compressedSize / originalSize) * 100).toFixed(2);

  document.getElementById("original-size").textContent = originalSize;
  document.getElementById("compressed-size").textContent = compressedSize;
  document.getElementById("ratio").textContent = `${ratio}%`;

  // Codes Table
  const tbody = document.querySelector("#codes-table tbody");
  tbody.innerHTML = "";
  for (const [char, code] of Object.entries(huffmanCodes)) {
    const row = `<tr><td>${
      char === " " ? "' '" : char
    }</td><td>${code}</td></tr>`;
    tbody.innerHTML += row;
  }

  // Encoded String
  document.getElementById("encoded-string").textContent = encodedString;

  // Huffman Tree
  const treeContainer = document.getElementById("huffman-tree-visual");
  treeContainer.innerHTML = "";
  drawTree(huffmanTreeRoot, treeContainer);

  // Decompression Setup
  document.getElementById("decompress-input").value = encodedString;
  document.getElementById("decoded-output").textContent = "";

  // Show UI
  document.getElementById("results").classList.remove("hidden");
  document.getElementById("decompress-section").classList.remove("hidden");
  downloadBtn.classList.remove("hidden");
});

// --- Decompress ---
decompressBtn.addEventListener("click", () => {
  const encodedText = document.getElementById("decompress-input").value.trim();
  if (!huffmanTreeRoot) {
    alert("Compress something first to generate a Huffman Tree.");
    return;
  }

  const decoded = huffmanDecompression(encodedText, huffmanTreeRoot);
  document.getElementById("decoded-output").textContent = decoded;
});

// --- File Upload ---
fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    textInput.value = e.target.result;
  };
  reader.onerror = () => alert("Failed to read file.");
  reader.readAsText(file);
});

// --- Download File ---
downloadBtn.addEventListener("click", () => {
  const encoded = document.getElementById("encoded-string").textContent;
  if (!encoded) {
    alert("Nothing to download.");
    return;
  }

  const blob = new Blob([encoded], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "compressed.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});
