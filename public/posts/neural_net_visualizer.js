
const layers = [2, 3, 2];
let weights = [
    [[0.10, 0.20], [0.30, 0.40], [0.50, 0.60]],
    [[0.70, 0.80, 0.90], [1.00, 1.10, 1.20]]
];
let biases = [
    [0.10, 0.20, 0.30],
    [0.40, 0.50]
];

function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

function round2(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}

function createNetwork() {
    const svg = document.getElementById('network');
    svg.innerHTML = '';
    const width = svg.clientWidth;
    const height = svg.clientHeight;
    const layerSpacing = width / (layers.length + 1);
    const neuronRadius = 20;

    for (let l = 0; l < layers.length; l++) {
        const layerSize = layers[l];
        const neuronSpacing = height / (layerSize + 1);

        for (let n = 0; n < layerSize; n++) {
            const neuron = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            const x = (l + 1) * layerSpacing;
            const y = (n + 1) * neuronSpacing;
            neuron.setAttribute("cx", x);
            neuron.setAttribute("cy", y);
            neuron.setAttribute("r", neuronRadius);
            neuron.setAttribute("fill", "#d3d3d3");
            neuron.setAttribute("stroke", "#333");
            neuron.setAttribute("id", `neuron-${l}-${n}`);
            svg.appendChild(neuron);

            const activationText = document.createElementNS("http://www.w3.org/2000/svg", "text");
            activationText.setAttribute("x", x);
            activationText.setAttribute("y", y + 5);
            activationText.setAttribute("text-anchor", "middle");
            activationText.setAttribute("fill", "#000");
            activationText.setAttribute("id", `activation-${l}-${n}`);
            activationText.textContent = "0.00";
            svg.appendChild(activationText);

            if (l > 0) {
                const biasText = document.createElementNS("http://www.w3.org/2000/svg", "text");
                biasText.setAttribute("x", x);
                biasText.setAttribute("y", y + neuronRadius + 15);
                biasText.setAttribute("text-anchor", "middle");
                biasText.setAttribute("fill", "#666");
                biasText.setAttribute("class", "editable");
                biasText.textContent = `b: ${biases[l-1][n].toFixed(2)}`;
                biasText.setAttribute("id", `bias-${l-1}-${n}`);
                biasText.onclick = (e) => showTooltip(e, 'bias', l-1, n);
                svg.appendChild(biasText);

                for (let prevN = 0; prevN < layers[l-1]; prevN++) {
                    const prevX = l * layerSpacing;
                    const prevY = (prevN + 1) * (height / (layers[l-1] + 1));
                    const connection = document.createElementNS("http://www.w3.org/2000/svg", "path");
                    const d = `M ${prevX} ${prevY} C ${(prevX + x) / 2} ${prevY}, ${(prevX + x) / 2} ${y}, ${x} ${y}`;
                    connection.setAttribute("d", d);
                    connection.setAttribute("fill", "none");
                    connection.setAttribute("stroke", "#999");
                    connection.setAttribute("stroke-width", "1.5");
                    connection.setAttribute("id", `connection-${l-1}-${prevN}-${n}`);
                    svg.appendChild(connection);

                    const weightText = document.createElementNS("http://www.w3.org/2000/svg", "text");
                    weightText.setAttribute("x", (prevX + x) / 2);
                    weightText.setAttribute("y", (prevY + y) / 2);
                    weightText.setAttribute("text-anchor", "middle");
                    weightText.setAttribute("fill", "#666");
                    weightText.setAttribute("class", "editable");
                    weightText.textContent = weights[l-1][n][prevN].toFixed(2);
                    weightText.setAttribute("id", `weight-${l-1}-${n}-${prevN}`);
                    weightText.onclick = (e) => showTooltip(e, 'weight', l-1, n, prevN);
                    svg.appendChild(weightText);
                }
            }

            if (l === 0 || l === layers.length - 1) {
                const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
                label.setAttribute("x", x);
                label.setAttribute("y", y - neuronRadius - 5);
                label.setAttribute("text-anchor", "middle");
                label.setAttribute("fill", "#333");
                label.textContent = l === 0 ? `Input ${n+1}` : `Output ${n+1}`;
                svg.appendChild(label);
            }
        }
    }
}

function showTooltip(event, type, ...indices) {
    const tooltip = document.getElementById('tooltip');
    const value = type === 'bias' ? biases[indices[0]][indices[1]] : weights[indices[0]][indices[1]][indices[2]];
    
    tooltip.innerHTML = `
        <input type="number" id="edit-value" value="${value.toFixed(2)}" step="0.01" style="width: 60px;">
        <button onclick="updateValueFromTooltip('${type}', ${indices.join(', ')})">Update</button>
    `;
    
    const clickedElement = event.target;
    const rect = clickedElement.getBoundingClientRect();
    const svgRect = document.getElementById('network').getBoundingClientRect();
    
    tooltip.style.left = `${rect.left - svgRect.left + rect.width / 2}px`;
    tooltip.style.top = `${rect.bottom - svgRect.top + 5}px`;
    tooltip.style.display = 'block';
    
    const inputElement = document.getElementById('edit-value');
    inputElement.focus();
    
    // Add event listener for Enter key
    inputElement.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            updateValueFromTooltip(type, ...indices);
        }
    });
}

function updateValueFromTooltip(type, ...indices) {
    const newValue = round2(parseFloat(document.getElementById('edit-value').value));
    if (!isNaN(newValue)) {
        updateValue(type, newValue, ...indices);
        document.getElementById('tooltip').style.display = 'none';
        runNetwork();
    }
}

function updateValue(type, newValue, ...indices) {
    if (type === 'bias') {
        biases[indices[0]][indices[1]] = newValue;
        document.getElementById(`bias-${indices[0]}-${indices[1]}`).textContent = `b: ${newValue.toFixed(2)}`;
    } else if (type === 'weight') {
        weights[indices[0]][indices[1]][indices[2]] = newValue;
        document.getElementById(`weight-${indices[0]}-${indices[1]}-${indices[2]}`).textContent = newValue.toFixed(2);
    }
}

function forward(input) {
    let activations = [input];
    let zs = [];
    for (let l = 1; l < layers.length; l++) {
        let z = [];
        let a = [];
        for (let n = 0; n < layers[l]; n++) {
            let sum = biases[l-1][n];
            for (let prevN = 0; prevN < layers[l-1]; prevN++) {
                sum += weights[l-1][n][prevN] * activations[l-1][prevN];
            }
            z.push(round2(sum));
            a.push(round2(sigmoid(sum)));
        }
        zs.push(z);
        activations.push(a);
    }
    return { activations, zs };
}

function runNetwork() {
    const inputs = [1, 2].map(i => round2(parseFloat(document.getElementById(`input${i}`).value)));
    if (inputs.some(isNaN)) {
        alert('Please enter valid numbers for all inputs.');
        return;
    }
    const { activations, zs } = forward(inputs);
    updateVisualization(activations);
    updateCalculationBreakdown(activations, zs);
    updateMatrixVisualization();
}

function updateVisualization(activations) {
    activations.forEach((layerActivations, l) => {
        layerActivations.forEach((activation, n) => {
            const neuron = document.getElementById(`neuron-${l}-${n}`);
            const activationText = document.getElementById(`activation-${l}-${n}`);
            if (neuron && activationText) {
                const red = Math.floor(255 * (1 - activation));
                const green = Math.floor(255 * activation);
                const color = `rgb(${red}, ${green}, 0)`;
                neuron.setAttribute("fill", color);
                activationText.textContent = activation.toFixed(2);
            }
        });
    });
}

function updateCalculationBreakdown(activations, zs) {
    let breakdownHtml = '';
    for (let l = 1; l < layers.length; l++) {
        breakdownHtml += `<h4>Layer ${l}</h4>`;
        for (let n = 0; n < layers[l]; n++) {
            breakdownHtml += `<p>Neuron ${n + 1}:</p>`;
            breakdownHtml += `<p>z = ${biases[l-1][n].toFixed(2)}`;
            for (let prevN = 0; prevN < layers[l-1]; prevN++) {
                breakdownHtml += ` + (${weights[l-1][n][prevN].toFixed(2)} * ${activations[l-1][prevN].toFixed(2)})`;
            }
            breakdownHtml += ` = ${zs[l-1][n].toFixed(2)}</p>`;
            breakdownHtml += `<p>a = sigmoid(${zs[l-1][n].toFixed(2)}) = ${activations[l][n].toFixed(2)}</p>`;
        }
    }
    document.getElementById('calculation-details').innerHTML = breakdownHtml;
}

function updateMatrixVisualization() {
    let matrixHtml = '';
    for (let l = 0; l < weights.length; l++) {
        matrixHtml += `<h4>Layer ${l + 1}</h4>`;
        matrixHtml += '<div class="matrix">';
        matrixHtml += '<div class="matrix-row">Weights:</div>';
        for (let i = 0; i < weights[l].length; i++) {
            matrixHtml += '<div class="matrix-row">[';
            matrixHtml += weights[l][i].map(w => w.toFixed(2).padStart(6)).join(', ');
            matrixHtml += ']</div>';
        }
        matrixHtml += '</div>';

        matrixHtml += '<div class="matrix">';
        matrixHtml += '<div class="matrix-row">Biases:</div>';
        matrixHtml += '<div class="matrix-row">[';
        matrixHtml += biases[l].map(b => b.toFixed(2).padStart(6)).join(', ');
        matrixHtml += ']</div>';
        matrixHtml += '</div>';
    }
    document.getElementById('matrix-details').innerHTML = matrixHtml;
}

function randomizeWeightsAndBiases() {
    for (let l = 0; l < weights.length; l++) {
        for (let i = 0; i < weights[l].length; i++) {
            for (let j = 0; j < weights[l][i].length; j++) {
                weights[l][i][j] = round2(Math.random() * 2 - 1);
            }
        }
        for (let i = 0; i < biases[l].length; i++) {
            biases[l][i] = round2(Math.random() * 2 - 1);
        }
    }
    createNetwork();
    runNetwork();
}

// Event listeners for automatic updates
document.getElementById('input1').addEventListener('input', runNetwork);
document.getElementById('input2').addEventListener('input', runNetwork);

// Close tooltip when clicking outside
document.addEventListener('click', function(event) {
    const tooltip = document.getElementById('tooltip');
    if (!tooltip.contains(event.target) && !event.target.classList.contains('editable')) {
        tooltip.style.display = 'none';
    }
});

// Initialize the network
createNetwork();
runNetwork();

// Redraw on window resize
window.addEventListener('resize', () => {
    createNetwork();
    runNetwork();
});

document.addEventListener('DOMContentLoaded', function() {
    createNetwork();
    runNetwork();
});