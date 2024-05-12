document.addEventListener('DOMContentLoaded', function() {
    // Retrieve cart data from localStorage
    let cart = JSON.parse(localStorage.getItem('selectedProducts')) || [];

    // Select the cart table body where product rows will be added
    const cartTableBody = document.querySelector('#cart tbody');

    // Select the checkout button
    const checkoutButton = document.getElementById('checkout');

    // Function to update the cart table with the retrieved cart data
    function updateCartTable() {
        // Clear existing table rows
        cartTableBody.innerHTML = '';

        // Iterate through each product in the cart
        cart.forEach(product => {
            // Create a new row for the product
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>
                    <a href="#"><i class="far fa-times-circle"></i></a>
                </td>
                <td>
                    <img src="${product.img}" alt="">
                </td>
                <td>${product.name}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>
                    <input type="number" value="${product.quantity}" data-id="${product.id}" class="quantity-input">
                </td>
                <td>$${(product.price * product.quantity).toFixed(2)}</td>
            `;
            cartTableBody.appendChild(newRow);

            // Add event listener to quantity input for each product
            newRow.querySelector('.quantity-input').addEventListener('change', function(event) {
                const newQuantity = parseInt(event.target.value);
                const productId = event.target.dataset.id;

                // Update quantity for the corresponding product in the cart
                const productIndex = cart.findIndex(item => item.id === productId);
                if (newQuantity === 0) {
                    // If quantity becomes 0, remove the product from the cart
                    cart.splice(productIndex, 1);
                } else {
                    // Update quantity and recalculate the price
                    cart[productIndex].quantity = newQuantity;
                }

                // Save updated cart data to localStorage
                localStorage.setItem('selectedProducts', JSON.stringify(cart));

                // Update the cart table to reflect changes
                updateCartTable();
                updateSubtotalAndTotal();
            });
        });

        // Update subtotal and total when the cart is updated
        updateSubtotalAndTotal();
    }

    // Function to calculate and update the subtotal and total
    function updateSubtotalAndTotal() {
        const subtotal = cart.reduce((acc, product) => acc + (product.price * product.quantity), 0);
        const shipping = 'Free';
        const total = subtotal;
        
        document.querySelector('#subtotal td:last-child').textContent = `$${subtotal.toFixed(2)}`;
        document.querySelector('#shipping td:last-child').textContent = shipping;
        document.querySelector('#total td:last-child').textContent = `$${total.toFixed(2)}`;
    }

    // Update the cart table initially
    updateCartTable();

    // Add event listener to the checkout button
    checkoutButton.addEventListener('click', function() {
        // Show alert
        alert('Your order has been placed!');

        // Refresh the products table
        updateCartTable();
    });
});
