# Huffman Coding Visualizer & Compressor

**Live Project:** [**Click Here to View the Live Application**](https://bagaria323.github.io/hoffman-coding-visualiser/)



## Description

This is an interactive web application that demonstrates the Huffman coding algorithm, a fundamental concept in data compression. The tool allows users to compress text, visualize the generated Huffman Tree, and decompress the binary data back to its original form. It was built from the ground up using only Vanilla JavaScript, HTML, and CSS to showcase a strong understanding of core web technologies and computer science principles.

## Features

-   **Text Compression:** Compresses any input text using the Huffman algorithm.
-   **Decompression:** Decodes the compressed binary string back into the original text.
-   **Huffman Tree Visualization:** Dynamically generates and displays a visual representation of the Huffman Tree for any given input.
-   **File Handling:**
    -   Upload `.txt` files for compression using the browser's `FileReader` API.
    -   Download the compressed output as a `.txt` file.
-   **Detailed Stats:** Shows the original size (assuming 8-bit ASCII), compressed size, and the resulting compression ratio.

## Core Data Structures & Algorithms

This project was built to showcase a strong understanding of core DSA concepts:

-   **Greedy Algorithm:** The Huffman algorithm itself is a classic greedy approach. At each step, it makes the locally optimal choice of merging the two nodes with the lowest frequencies to build a globally optimal prefix code tree.
-   **Binary Trees:** The Huffman Tree is the central data structure, built from custom `HuffmanNode` objects. The structure of the tree itself defines the codes.
-   **Hash Maps (JS Objects):** Used for O(1) average time complexity when calculating character frequencies and for storing the final character-to-code mappings for efficient lookups.
-   **Priority Queue (Simulated):** A sorted array was used to simulate a Min-Priority Queue, which is essential for efficiently finding and extracting the two nodes with the lowest frequencies at each step of the tree-building process.
-   **Recursion:** Used extensively for:
    1.  Traversing the Huffman Tree to generate the binary codes.
    2.  Building the visual representation of the tree on the screen by recursively drawing each node and its children.

## Technologies Used

-   **Vanilla JavaScript (ES6+):** All logic, from the core algorithm to the DOM manipulation, is written in plain, standard JavaScript without any external frameworks or libraries.
-   **HTML5:** Structured the application with semantic HTML.
-   **CSS3:** Styled the application and created the tree visualization layout using modern features like Flexbox, pseudo-elements, and `z-index` for layering.

## How to Run Locally

1.  Clone the repository:
    ```bash
    git clone https://github.com/bagaria323/hoffman-coding-visualiser.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd hoffman-coding-visualiser
    ```
3.  Open `index.html` in your web browser.
