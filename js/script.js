const display = document.getElementById('display');
const calculationHistory = [];
let memory = 0;

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
    const display = document.getElementById('display');
    
    // Agrega los caracteres correspondientes según el botón presionado
    if (value === '^') {
        display.value += '^';
    } else if (value === 'sqrt(') {
        display.value += 'sqrt(';
    } else {
        display.value += value;
    }

    // Añade una clase de animación cuando se escribe un dígito u operador
    display.classList.remove('animate__fadeOut');
    display.classList.add('animate__fadeIn');
    
}

// Función para limpiar el campo de visualización con animaciones
function clearDisplay() {
    display.classList.remove('animate__fadeIn');
    display.classList.add('animate__fadeOut');

    setTimeout(() => {
        display.value = '';
        display.classList.remove('animate__fadeOut');
        display.classList.add('animate__shakeX');
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
    const display = document.getElementById('display');
    let expression = display.value;

    // Verificar si la entrada es válida antes de calcular
    if (!isValidInput(expression)) {
        display.value = 'Entrada inválida';
        return;
    }

    if (expression !== '') {
        try {
            // Reemplazar 'sqrt' con la llamada real a la función Math.sqrt
            expression = expression.replace(/sqrt\(([^)]+)\)/g, function(match, number) {
                return Math.sqrt(parseFloat(number));
            });

            // Reemplazar 'cbrt' con la llamada real a la función Math.cbrt
            expression = expression.replace(/cbrt\(([^)]+)\)/g, function(match, number) {
                return Math.cbrt(parseFloat(number));
            });

            // Reemplazar '^' con '**' para cálculos de potencia
            expression = expression.replace(/\^/g, '**');

            // Evaluar la expresión matemática utilizando eval()
            const result = eval(expression);

            // Agregar una clase de animación al mostrar el resultado
            display.classList.remove('animate__fadeIn');
            display.classList.add('animate__bounceIn');

            setTimeout(() => {
                // Mostrar el resultado y eliminar la clase de animación
                display.value = result;
                display.classList.remove('animate__bounceIn');

                // Agregar el cálculo al historial
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
    // Utiliza una expresión regular para validar la entrada.
    // Esta expresión regular permite números, operadores (+, -, *, /, ^), paréntesis y llamadas a sqrt() y cbrt() sin paréntesis de cierre.
    const regex = /^[\d+\-*/().^]*(sqrt\(\d+\)|sqrt\(\d+\.\d+\)|cbrt\(\d+\)|cbrt\(\d+\.\d+\)|\d+|\d+\.\d+)[\d+\-*/().^]*$/;
    const validOperators = ['+', '-', '*', '/', '^'];

    // Verifica que no haya dos operadores juntos en la entrada
    for (let i = 0; i < input.length - 1; i++) {
        if (validOperators.includes(input[i]) && validOperators.includes(input[i + 1])) {
            return false;
        }
    }

    // Verifica que los paréntesis estén balanceados
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

    // Verifica si los paréntesis están balanceados al final
    return parenthesesCount === 0 && regex.test(input);
}




function fillCalculatorField(expression) {
    const display = document.getElementById('display');
    display.value = expression;
}

const historyList = document.getElementById('historyList');
historyList.addEventListener('click', function (event) {
    // Verifica si el clic se realizó en un elemento de la lista (li)
    if (event.target && event.target.nodeName === 'LI') {
        // Obtiene el texto del elemento de la lista y lo utiliza para llenar el campo de la calculadora
        const expression = event.target.innerText.split('=')[0].trim();
        fillCalculatorField(expression);
    }
});




function addToMemory() {
    const displayValue = parseFloat(document.getElementById('display').value);
    memory += displayValue;
    updateMemoryDisplay();
}

function subtractFromMemory() {
    const displayValue = parseFloat(document.getElementById('display').value);
    memory -= displayValue;
    updateMemoryDisplay();
}

function recallMemory() {
    document.getElementById('display').value = memory;
}

function clearMemory() {
    memory = 0;
    updateMemoryDisplay();
}

function updateMemoryDisplay() {
    document.getElementById('memoryValue').innerText = memory;
}

