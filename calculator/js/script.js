// Инициализация переменных для работы калькулятора
let displayValue = '0'; // Значение, отображаемое на дисплее калькулятора
let firstOperand = null; // Первый операнд (число) для выполнения операции
let operator = null; // Текущий выбранный оператор (+, -, *, или /) для выполнения операции

const MAX_DISPLAY_LENGTH = 15; // Максимальная длина текста на дисплее

// Получение элементов DOM для переключателя темы, калькулятора и отображения результата
const themeToggle = document.getElementById('toggle');
const calculator = document.querySelector('.calculator');
const display = document.querySelector('.display');

// Функция для переключения темы
function toggleTheme() {
  if (themeToggle.checked) {
    document.body.classList.add('dark-theme');
    calculator.classList.add('dark-theme');
    display.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
    calculator.classList.remove('dark-theme');
    display.classList.remove('dark-theme');
  }
}

// Обработчик события для переключателя темы
themeToggle.addEventListener('change', toggleTheme);

// Функция для обновления отображения значения на дисплее калькулятора
function updateDisplay() {
  document.getElementById('display').textContent = displayValue;
}

// Функция для добавления символа (цифры или оператора) на дисплей
function appendToDisplay(value) {
  if (
    displayValue === '0'
    || displayValue === 'Ошибка'
    || displayValue === 'Infinity'
  ) {
    displayValue = value;
  } else {
    displayValue += value;
  }
  displayValue = displayValue.slice(0, MAX_DISPLAY_LENGTH); // Обрезаем текст до максимальной длины
  updateDisplay();
}

// Функция для обработки выбора оператора
function handleOperator(selectedOperator) {
  if (operator !== null) {
    calculate(); // Если уже есть выбранный оператор, выполняем расчет
  }
  firstOperand = displayValue; // Сохраняем текущее значение дисплея как первый операнд
  operator = selectedOperator; // Сохраняем выбранный оператор
  displayValue = '0'; // Сбрасываем значение дисплея для ввода следующего числа
}

// Функция для выполнения операции расчета
function calculate() {
  if (operator === null) return; // Если оператор не выбран, выходим из функции

  const secondOperand = displayValue; // Получаем второй операнд (текущее значение дисплея)
  let result;

  // Выполняем расчет в зависимости от выбранного оператора
  switch (operator) {
    case '+':
      result = parseFloat(firstOperand) + parseFloat(secondOperand);
      break;
    case '-':
      result = parseFloat(firstOperand) - parseFloat(secondOperand);
      break;
    case '*':
      result = parseFloat(firstOperand) * parseFloat(secondOperand);
      break;
    case '/':
      result = parseFloat(firstOperand) / parseFloat(secondOperand);
      break;
  }

  displayValue = result.toString(); // Преобразуем результат в строку для отображения
  updateDisplay();
  firstOperand = null; // Обнуляем первый операнд
  operator = null; // Обнуляем оператор
}

// Функция для очистки дисплея калькулятора
function clearDisplay() {
  displayValue = '0';
  firstOperand = null;
  operator = null;
  updateDisplay();
}

// Функция для анимации кнопок калькулятора при нажатии
function animateButton(button) {
  button.classList.add('blink'); // Добавляем класс для мигания кнопки
  setTimeout(() => {
    button.classList.remove('blink'); // Удаляем класс через небольшой промежуток времени
  }, 200);
}

// Добавление обработчика события клика для каждой кнопки калькулятора (цифры и операторы)
document.querySelectorAll('.number, .operator').forEach((button) => {
  button.addEventListener('click', () => {
    animateButton(button); // Вызываем функцию анимации кнопки
  });
});

// Обработка событий нажатия клавиш клавиатуры
document.addEventListener('keydown', (event) => {
  const { key } = event;
  const validKeys = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '+',
    '-',
    '*',
    '/',
    '=',
    'Enter',
    'Backspace',
    'c',
    'C',
  ];

  if (validKeys.includes(key)) {
    if (key === 'Enter' || key === '=') {
      calculate(); // Если нажата клавиша Enter (=), выполняем расчет
    } else if (key === 'Backspace') {
      clearDisplay(); // Если нажата клавиша Backspace, очищаем дисплей
    } else if (key === 'c' || key === 'C') {
      displayValue = '0';
      firstOperand = null;
      operator = null;
      updateDisplay();
    } else {
      appendToDisplay(key); // В противном случае, добавляем нажатый символ на дисплей
    }
  }
});

updateDisplay(); // Обновляем отображение при загрузке страницы
