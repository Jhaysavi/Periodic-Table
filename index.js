document.addEventListener('DOMContentLoaded', () => {
    fetch('https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json')
        .then(response => response.json())
        .then(data => {
            const elements = data.elements; 

            const tableBody = document.getElementById('table-body');

            for (let row = 1; row <= 7; row++) {
                const tableRow = document.createElement('tr');

                for (let col = 1; col <= 18; col++) {
                    const tableCell = document.createElement('td');
                    const element = findElement(elements, row, col);
                    if (element) {
                        const elementDiv = createDivElement(element);
                        const categoryClass = element.category.replace(/\s+/g, '-'); // Replace whitespace with hyphens
                        elementDiv.classList.add(categoryClass);
                        tableCell.appendChild(elementDiv);
                        if ([109, 110, 111, 113, 115, 116, 117, 118].includes(element.number)) {
                            elementDiv.classList.add('unknown');
                        }

                        if (row >= 6) {
                            tableRow.classList.add('last-two-rows');
                        }

                    }

                    tableRow.appendChild(tableCell);
                }

                tableBody.appendChild(tableRow);
            }
        })
        .catch(error => console.log(error));
});

function findElement(data, row, col) {
    return Object.values(data).find(element => element.period === row && element.group === col);
}

function createDivElement(element) {
    const elementDiv = document.createElement('div');
    elementDiv.className = 'element';
    elementDiv.innerHTML = `
        <span class="symbol">${element.symbol}</span>
        <span class="atomic-number">${element.number}</span>
        <p class="name">${element.name}</p>
        <p class="atomic-mass">${element.atomic_mass}</p>
        <div class="element-details">
            <div></div>
            <div></div>
        </div>
    `;
    elementDiv.setAttribute('title', element.name);
    return elementDiv;
}
