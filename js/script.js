// Obtener el elemento de visualización
const display = document.getElementById('display');

// Historial de cálculos
const calculationHistory = [];

// Función para agregar un cálculo al historial
function addToHistory(expression, result) {
    calculationHistory.push({ expression, result });

    // Actualizar la lista de historial en el HTML
    const historyList = document.getElementById('historyList');
    const listItem = document.createElement('li');
    listItem.innerText = `${expression} = ${result}`;
    historyList.appendChild(listItem);
}

// Función para agregar contenido al campo de visualización
function appendToDisplay(value) {
    display.value += value;
}

// Función para limpiar el campo de visualización con animaciones
function clearDisplay() {
    display.classList.remove('animate__fadeIn');
    display.classList.add('animate__fadeOut');

    setTimeout(() => {
        display.value = '';
        display.classList.remove('animate__fadeOut');
        display.classList.add('animate__shakeX');

        setTimeout(() => {
            display.classList.remove('animate__shakeX');
        }, 1000);
    }, 1000);
}

// Función para animar la visualización cuando se escribe un dígito
function animateDisplay(value) {
    display.classList.remove('animate__fadeOut');
    display.classList.add('animate__fadeIn');

    setTimeout(() => {
        display.classList.remove('animate__fadeIn');
    }, 1000);

    display.value += value;
}

// Función para calcular la expresión matemática
function calculate() {
    const expression = display.value;

    if (!isValidInput(expression)) {
        display.value = 'Entrada inválida';
        return;
    }

    if (expression !== '') {
        try {
            const expressionWithCos = expression.replace(/cos\(([^)]+)\)/g, function(match, degrees) {
                const radians = (parseFloat(degrees) * Math.PI) / 180;
                return Math.cos(radians);
            });

            const result = eval(expressionWithCos);

            display.classList.remove('animate__fadeIn');
            display.classList.add('animate__bounceIn');

            setTimeout(() => {
                display.value = result;
                display.classList.remove('animate__bounceIn');
                addToHistory(expression, result);
            }, 300);
        } catch (error) {
            display.value = 'Error';
        }
    }
}

// Función para eliminar el último carácter del campo de visualización
function backspace() {
    const currentValue = display.value;

    if (currentValue.length > 0) {
        const newValue = currentValue.slice(0, -1);
        display.value = newValue;

        display.classList.remove('animate__bounceIn');
        display.classList.add('animate__rubberBand');

        setTimeout(() => {
            display.classList.remove('animate__rubberBand');
        }, 1000);
    }
}

// Agregar un evento de escucha de teclado
document.addEventListener('keydown', function(event) {
    const key = event.key;

    if (/[0-9]/.test(key)) {
        const buttonId = 'num' + key + 'Button';
        const button = document.getElementById(buttonId);
        if (button) {
            button.click();
        }
    } else if (key === '.') {
        const dotButton = document.getElementById('dotButton');
        if (dotButton) {
            dotButton.click();
        }
    } else if (key === 'Enter' || key === '=') {
        const equalsButton = document.getElementById('equalsButton');
        if (equalsButton) {
            equalsButton.click();
        }
    } else if (key === 'Backspace') {
        const backspaceButton = document.getElementById('backspaceButton');
        if (backspaceButton) {
            backspaceButton.click();
        }
    } else if (key === 'Escape') {
        const clearButton = document.getElementById('clearButton');
        if (clearButton) {
            clearButton.click();
        }
    }
});

// Función para validar la entrada
function isValidInput(input) {
    const regex = /^[\d+\-*/(). ]*$/;
    const validOperators = ['+', '-', '*', '/'];

    for (let i = 0; i < input.length - 1; i++) {
        if (validOperators.includes(input[i]) && validOperators.includes(input[i + 1])) {
            return false;
        }
    }

    let parenthesesCount = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i] === '(') {
            parenthesesCount++;
        } else if (input[i] === ')') {
            parenthesesCount--;
        }

        if (parenthesesCount < 0) {
            return false;
        }
    }

    return parenthesesCount === 0 && regex.test(input);
}

function applyDefaultStyle() {
    // Aplicar estilo predeterminado (eliminar clases de estilo alternativo)
    document.body.classList.remove('cyberpunk-theme');
}

function applyCyberpunkStyle() {
    // Aplicar estilo cyberpunk
    document.body.classList.add('cyberpunk-theme');
}

// Función para alternar el despliegue del botón
function toggleStyleMenu() {
    const styleToggleContent = document.getElementById('styleToggleContent');
    styleToggleContent.classList.toggle('active');
}

// Agregar un evento de clic al botón para alternar el despliegue
const styleToggleButton = document.getElementById('styleToggleButton');
styleToggleButton.addEventListener('click', toggleStyleMenu);

function toggleStyle() {
    const body = document.body;
    body.classList.toggle('cyberpunk-theme'); // Agrega o elimina la clase del estilo cyberpunk
}
styleToggleButton.addEventListener('click', toggleStyle);




