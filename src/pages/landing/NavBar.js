// @flow
import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/logo.png';

const NavBar = (): React$Element<React$FragmentType> => {

    function scrollToElement(elementId){
        const element = document.getElementById(elementId);
        if(element) element.scrollIntoView({behavior: 'smooth', block: 'start'});
    }

    return (
        <>
            <Navbar collapseOnSelect expand="lg" variant="dark" className="py-lg-3">
                <Container>
                    <Navbar.Brand href="/" className="me-lg-5">
                        <img src={logo} alt="" className="logo-dark" height="18" />
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav">
                        <i className="mdi mdi-menu"></i>
                    </Navbar.Toggle>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav as="ul" className="me-auto align-items-center">
                            <Nav.Item as="li" className="mx-lg-1">
                                <Nav.Link onClick={()=>scrollToElement('home-section')} href="" className="active">
                                    Home
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="mx-lg-1">
                                <Nav.Link onClick={()=>scrollToElement('services-section')} href="">Services</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="mx-lg-1">
                                <Nav.Link onClick={()=>scrollToElement('features-section')} href="">Features</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="mx-lg-1">
                                <Nav.Link onClick={()=>scrollToElement('faq-section')} href="">FAQs</Nav.Link>
                            </Nav.Item>
                        </Nav>

                        <Nav className="ms-auto align-items-center">
                            <Nav.Item className="me-0">
                                <Nav.Link
                                    href="/account/login"
                                    className="d-lg-none">
                                    Log In
                                </Nav.Link>
                                <Link
                                    to="/account/login"
                                    className="btn btn-sm btn-light btn-rounded d-none d-lg-inline-flex">
                                    Log In
                                </Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default NavBar;
