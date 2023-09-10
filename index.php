<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculadora</title>
    <!-- Incluye Tailwind CSS desde CDN -->
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/animate.css@4.1.1/animate.min.css" rel="stylesheet">
    <link href="cyberpunk-theme.css" rel="stylesheet" id="styleSheet">
    <style>
        /* Estilo personalizado para la tarjeta y la imagen de fondo */
        .background-image {
            background-image: url('night.avif');
            background-size: cover;
            background-position: center center;
        }

        .overlay {
            background-color: rgba(255, 255, 255, 0.9);
        }

        .result-input {
            background-color: rgba(255, 255, 255, 0.8);
            border: 2px solid #ccc;
        }
    </style>
</head>
<body class="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white">
<div class="min-h-screen flex items-center justify-center background-image">
    <div class="bg-gray-300 dark:bg-gray-700 p-8 rounded-lg shadow-lg overlay w-96 animate__animated animate__fadeIn">
        <h1 class="text-4xl mb-6">Calculadora</h1>
        <input id="display" class="w-full h-16 px-4 mb-4 text-2xl result-input rounded-lg animate__animated animate__bounceIn" type="text" readonly>
        <div class="grid grid-cols-4 gap-4 mx-auto mt-8">
    <!-- Fila 1 -->
    <button class="btn" id="clearButton" onclick="clearDisplay()">C</button>
    <button class="btn" id="backspaceButton" onclick="backspace()">←</button>
    <button class="btn" id="divideButton" onclick="appendToDisplay('/')">/</button>
    <button class="btn" id="multiplyButton" onclick="appendToDisplay('*')">*</button>
    
    <!-- Fila 2 -->
    <button class="btn" id="num7Button" onclick="appendToDisplay('7')">7</button>
    <button class="btn" id="num8Button" onclick="appendToDisplay('8')">8</button>
    <button class="btn" id="num9Button" onclick="appendToDisplay('9')">9</button>
    <button class="btn" id="subtractButton" onclick="appendToDisplay('-')">-</button>
    
    <!-- Fila 3 -->
    <button class="btn" id="num4Button" onclick="appendToDisplay('4')">4</button>
    <button class="btn" id="num5Button" onclick="appendToDisplay('5')">5</button>
    <button class="btn" id="num6Button" onclick="appendToDisplay('6')">6</button>
    <button class="btn" id="addButton" onclick="appendToDisplay('+')">+</button>
    
    <!-- Fila 4 -->
    <button class="btn" id="num1Button" onclick="appendToDisplay('1')">1</button>
    <button class="btn" id="num2Button" onclick="appendToDisplay('2')">2</button>
    <button class="btn" id="num3Button" onclick="appendToDisplay('3')">3</button>
    
    <!-- Fila 5 -->
    <button class="btn" id="num0Button" onclick="appendToDisplay('0')">0</button>
    <button class="btn" id="dotButton" onclick="appendToDisplay('.')">.</button>
    <button class="btn" id="equalsButton" onclick="calculate()">=</button>
</div>
        <div id="calcHistory" class="mx-auto mt-4">
            <h2 class="text-lg font-semibold mb-2">Historial de Cálculos</h2>
            <ul id="historyList">
        <!-- Los cálculos anteriores se mostrarán aquí -->
    </ul>
</div>

        </div>
    </div>
    <script src="js/script.js"></script>
</body>
</html>