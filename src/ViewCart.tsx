import { Product } from "./ProductCatalogue";
import { Link } from "react-router-dom";

interface ViewCartProps {
    cart: Product[];
    removeProduct: (product: Product) => void;
}

interface CartItem {
    product: Product;
    quantity: number;
    totalPrice: number;
}

const ViewCart = ({ cart, removeProduct }: ViewCartProps) => {
    const totalItemPrice = (product: Product, quantity: number) => {
        return product.price * quantity;
    };

    const totalNumberOfItem = (product: Product) => {
        let totalQuantity = cart.filter(
            (item) => item.id === product.id,
        ).length;

        return totalQuantity;
    };

    const calculateTotalPrice = () => {
        let finalPrice = 0;
        cart.forEach((product) => {
            finalPrice += totalItemPrice(product, totalNumberOfItem(product));
        });
        return finalPrice.toFixed(2);
    };

    return (
        <div>
            <h1>Shopping Cart</h1>
            <p>
                Welcome to the shopping cart. Review your selected items below.
            </p>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((product: Product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>£{product.price.toFixed(2)}</td>
                            <td>{totalNumberOfItem(product)}</td>
                            <td>
                                £
                                {totalItemPrice(
                                    product,
                                    totalNumberOfItem(product),
                                ).toFixed(2)}
                            </td>
                            <td>
                                <button onClick={() => removeProduct(product)}>
                                    Remove from Cart
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p>Total Items in Cart: {cart.length}</p>
            <p>Total Price: £ {calculateTotalPrice()}</p>
            <Link to="/">Back to Product Catalogue</Link>
        </div>
    );
};

export default ViewCart;
