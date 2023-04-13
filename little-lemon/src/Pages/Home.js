import  React from 'react';
import Main from './Main.js';
import Specials from './Specials.js';
import CustomerReviews from './CustomerReviews.js';
import Chicago from './Chicago.js';
import Footer from './Footer.js';

function Home () {
    return (
        <>
        <Main />
        <Specials />
        <CustomerReviews />
        <Chicago />
        <Footer />
        </>
    );
};

export default Home;