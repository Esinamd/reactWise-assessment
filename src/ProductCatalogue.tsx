import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export interface Product {
    id: string;
    name: string;
    price: number;
}

interface ProductCatalogueProps {
    addToCart: (product: Product) => void;
    cart: Product[];
}


const ProductCatalogue = ({ addToCart, cart }: ProductCatalogueProps) => {
    const [allProducts, setAllProducts] = useState<Product[]>([]);

    const fetchProducts = async () => {
        try {
            const response = await fetch("http://localhost:3001/products", {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const products: Product[] = await response.json();
            setAllProducts(products);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Product Catalogue</h1>
            <p>Welcome to the product catalogue. Browse our products below.</p>
            <p>Items in Cart: {cart.length}</p>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {allProducts.map((product: Product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>£{product.price.toFixed(2)}</td>
                            <td>
                                <button onClick={() => addToCart(product)}>
                                    Add to Cart
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/cart">View Cart</Link>
        </div>
    );
};

export default ProductCatalogue;
