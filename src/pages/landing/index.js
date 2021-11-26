// @flow
import React, { useEffect } from 'react';

// components
import NavBar from './NavBar';
import Hero from './Hero';
import Services from './Services';
import Features from './Features';
import FAQ from './FAQ';
import Footer from './Footer';
import Layouts from './Layouts';
import Pricing from './Pricing';
import ContactUs from './ContactUs';

// dummy data
import { services, layouts, features, plans, rawFaqs } from './Data';

const Landing = (): React$Element<React$FragmentType> => {
    useEffect(() => {
        if (document.body) document.body.classList.remove('authentication-bg');
    }, []);

    return (
        <>
            <NavBar />

            <Hero />

            <Services services={services} />

            <Features features={features} />

            <FAQ rawFaqs={rawFaqs} />

            <Footer />
        </>
    );
};

export default Landing;
