import React from "react";

function Main() {
    return (
        <main className="main-content">
            <section className="main-container">
                <h1>Little Lemon</h1>
                <h4>Chicago</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <button className="reserve button">Reserve a Table</button>
            </section>
                <figure className="bread">
                    <img src="./images/restauranfood.jpg" alt="bread on plate"></img>
                </figure>
            <section className="highlights">
                <h2>This weeks specials!</h2>
                <button className="reserve button">Online Menu</button>
            </section>
            <section className="food">
                <div className="food-container">
                    <div className="food-item">
                        <figure>
                            <img src="./images/greek salad.jpg" alt="green salad"></img>
                        </figure>
                        <h3>Greek Salad</h3>
                        <h6>$12.99</h6>
                        <p>The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons. </p>
                        <h5>Order a delivery </h5>
                        <figure className="cart-icon">
                            <img src="./images/cart.jpg" alt="cart icon"></img>
                        </figure>
                    </div>
                    <div className="food-item">
                        <figure>
                            <img src="./images/greek salad.jpg" alt="green salad"></img>
                        </figure>
                        <h3>Greek Salad</h3>
                        <h6>$12.99</h6>
                        <p>The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons. </p>
                        <h5>Order a delivery </h5>
                        <figure className="cart-icon">
                            <img src="./images/cart.jpg" alt="cart icon"></img>
                        </figure>
                    </div>
                    <div className="food-item">
                        <figure>
                            <img src="./images/greek salad.jpg" alt="green salad"></img>
                        </figure>
                        <h3>Greek Salad</h3>
                        <h6>$12.99</h6>
                        <p>The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons. </p>
                        <h5>Order a delivery </h5>
                        <figure className="cart-icon">
                            <img src="./images/cart.jpg" alt="cart icon"></img>
                        </figure>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Main;
