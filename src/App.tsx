import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductCatalogue, { Product } from "./ProductCatalogue";
import ViewCart from "./ViewCart";

const App = () => {
    const [cart, setCart] = useState<Product[]>([]);

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProductCatalogue
                                cart={cart}
                                addToCart={(product) =>
                                    setCart((currentCart) => [
                                        ...currentCart,
                                        product,
                                    ])
                                }
                            />
                        }
                    />
                    <Route
                        path="/cart"
                        element={
                            <ViewCart
                                cart={cart}
                                removeProduct={(product) =>
                                    setCart((currentCart) =>
                                        currentCart.filter(
                                            (item) => item.id !== product.id,
                                        ),
                                    )
                                }
                            />
                        }
                    />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
