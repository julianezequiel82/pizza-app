document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('searchForm');
    const resultContainer = document.getElementById('resultContainer');
    const pizzaIdInput = document.getElementById('pizzaId');

    // Datos de ejemplo de pizzas
    const pizzas = [
        { id: 1, name: 'jamon aceitunas y huevo', image: 'https://latorrepizza.com.ar/wp-content/uploads/2023/05/jamon-y-morron.png', price: '12.00' },
        { id: 2, name: 'Muzzarella', image: 'https://pizzafactory.com.ar/wp-content/uploads/2023/01/CLAS-005.jpg.webp', price: '10.00' },
        { id: 3, name: 'jamon y morrones', image: 'https://mamacorapub.com/wp-content/uploads/2020/05/pizza-especial-salsa.jpg', price: '11.00' }
    ];

    // Renderiza una pizza en el contenedor
    function renderPizza(pizza) {
        resultContainer.innerHTML = `
            <div class="card">
                <img src="${pizza.image}" alt="${pizza.name}">
                <h2>${pizza.name}</h2>
                <p>Precio: $${pizza.price}</p>
            </div>
        `;
    }

    // Renderiza un mensaje de error
    function renderError(message) {
        resultContainer.innerHTML = `<div class="error-message">${message}</div>`;
    }

    // Maneja el evento de submit del formulario
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const pizzaId = parseInt(pizzaIdInput.value, 10);

        if (isNaN(pizzaId) || pizzaId <= 0) {
            renderError('Por favor ingresa un número válido.');
            return;
        }

        const pizza = pizzas.find(p => p.id === pizzaId);

        if (pizza) {
            renderPizza(pizza);
            localStorage.setItem('lastPizza', JSON.stringify(pizza));
        } else {
            renderError('Pizza no encontrada.');
        }
    });

    // Carga la última pizza buscada desde localStorage
    const lastPizza = JSON.parse(localStorage.getItem('lastPizza'));
    if (lastPizza) {
        renderPizza(lastPizza);
    }
});
