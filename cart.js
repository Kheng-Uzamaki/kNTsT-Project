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
                    <a href="#" class="remove-product"><i class="far fa-times-circle remove"></i></a>
                </td>
                <td>
                    <img src="${product.img}" alt="">
                </td>
                <td>${product.name}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>
                    <input type="number" value="${product.quantity}" data-id="${product.id}" class="quantity-input" min="1">
                </td>
                <td>$${(product.price * product.quantity).toFixed(2)}</td>
            `;
            cartTableBody.appendChild(newRow);

            // Add event listener to quantity input for each product
            newRow.querySelector('.quantity-input').addEventListener('change', function(event) {
                let newQuantity = parseInt(event.target.value);
                const productId = event.target.dataset.id;

                // Ensure minimum quantity is 1
                if (newQuantity < 1) {
                    newQuantity = 1;
                    event.target.value = newQuantity;
                }

                // Update quantity for the corresponding product in the cart
                const productIndex = cart.findIndex(item => item.id === productId);
                cart[productIndex].quantity = newQuantity;

                // Save updated cart data to localStorage
                localStorage.setItem('selectedProducts', JSON.stringify(cart));

                // Update the cart table to reflect changes
                updateCartTable();
                updateSubtotalAndTotal();
            });

            // Add event listener to remove product button
            newRow.querySelector('.remove-product').addEventListener('click', function(event) {
                event.preventDefault();
                const productId = event.target.closest('tr').querySelector('.quantity-input').dataset.id;

                // Remove the product from the cart
                cart = cart.filter(item => item.id !== productId);

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
    
        // Update subtotal input value
        document.querySelector('input[name="Subtotal"]').value = `$${subtotal.toFixed(2)}`;
    
        // Update total input value
        document.querySelector('input[name="Total"]').value = `$${total.toFixed(2)}`;
    
        // Concatenate product details for each product
        const productDetails = cart.map(product => {
            return `ID: ${product.id}, Name: ${product.name}, Image: ${product.img}`;
        });
    
        // Join product details with a separator
        const allProductDetails = productDetails.join('\n');
    
        // Update product details input value
        document.querySelector('input[name="product"]').value = allProductDetails;
    }

    // Update the cart table initially
    updateCartTable();

    // Add event listener to the checkout button
    checkoutButton.addEventListener('click', function() {
        // Show alert
        alert('Your order has been placed!');

        // Clear local storage
        localStorage.removeItem('selectedProducts');

        // Clear input fields for full name and telephone number
        document.querySelector('input[name="Fullname"]').value = '';
        document.querySelector('input[name="tel"]').value = '';
    });
});
