import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import itemsData from '../data/items.json';

export default function Sales() {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [quantity, setQuantity] = useState('');
    const [cart, setCart] = useState([]);
    const [itemTotal, setItemTotal] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        // Simulated data for demonstration purposes
        setItems(itemsData);
    }, []);

    const handleAddToCart = () => {
        if (selectedItem && quantity !== '') {
            const itemInCart = cart.find((cartItem) => cartItem.id === selectedItem.id);

            if (itemInCart) {
                // If the item is already in the cart, update its quantity
                const updatedCart = cart.map((cartItem) =>
                    cartItem.id === selectedItem.id ? { ...cartItem, quantity: cartItem.quantity + parseInt(quantity) } : cartItem
                );
                setCart(updatedCart);
            } else {
                // If the item is not in the cart, add it
                setCart([...cart, { ...selectedItem, quantity: parseInt(quantity) }]);
            }

            // Calculate and update item total
            const newItemTotal = selectedItem.price * parseInt(quantity);
            setItemTotal(itemTotal + newItemTotal);

            // Calculate and update total
            const newTotal = total + newItemTotal;
            setTotal(newTotal);

            // Reset selected item and quantity
            setSelectedItem(null);
            setQuantity('');
        }
    };

    const handleCheckout = () => {
        // Save the cart data to a JSON file
        const jsonData = JSON.stringify(cart, null, 2);

        // Create a Blob with the JSON data
        const blob = new Blob([jsonData], { type: 'application/json' });

        // Create a link element to trigger the download
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'cart.json';
        a.click();
    };

    return (
        <div>
            <h1>Sales</h1>
            <div className="d-flex">
                <div className="d-grid bg-light w-25 rounded-2 p-4">
                    <h6 className="text-center">Add Sales</h6>
                    {/* Dropdown to select items*/}
                    <select
                        className="form-select form-select-sm mb-3"
                        aria-label=".form-select-sm example"
                        value={selectedItem ? selectedItem.id : ''}
                        onChange={(e) => {
                            const selectedItemId = parseInt(e.target.value);
                            const selectedItem = items.find((item) => item.id === selectedItemId);
                            setSelectedItem(selectedItem);
                        }}
                    >
                        <option value="" disabled>
                            Select Item
                        </option>
                        {items.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                    {/* Input Quantity*/}
                    <input
                        type="number"
                        className="form-control form-control-sm"
                        placeholder="Quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    {/* Button to add item*/}
                    <button className="btn btn-primary btn-sm mt-2" onClick={handleAddToCart}>
                        Add
                    </button>
                </div>

                {/* Display Cart */}
                <div className="w-75 container">
                    <h2>Shopping Cart</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((cartItem, index) => (
                                <tr key={index}>
                                    <td>{cartItem.name}</td>
                                    <td>{cartItem.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
          
            {/* Display Totals */}
            <div className="container">
                <h2>Totals</h2>
                <p>Item Total: Rs. {itemTotal.toFixed(2)}</p>
                <p>Total: Rs. {total.toFixed(2)}</p>
                <div>
                    <button className="btn btn-success" onClick={handleCheckout}>
                        Checkout
                    </button>
                </div>
            </div>

            
        </div>
    );
}
