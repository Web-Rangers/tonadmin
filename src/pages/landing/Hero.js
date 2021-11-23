// @flow
import React from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';

import image1 from '../../assets/images/startup.svg';

const Hero = (): React$Element<'section'> => {
    return (
        <section className="hero-section" id="home-section">
            <Container>
                <Row className="align-items-center">
                    <Col md={5}>
                        <div className="mt-md-4">
                            <h2 className="text-white fw-normal mb-4 mt-3 hero-title">
                                TON Blockchain Monitoring & Validator Administration
                            </h2>

                            <p style={{opacity:"0.75"}} className="mb-4 font-16 text-white">
                                TonAdmin is a web-based which displays summarized data on the state and availability of TON Blockchain.
                                Also includes a dashboard for validator administration and wallet managment.
                            </p>

                            <a href="/account/login" className="btn btn-success">
                                Log In <i className="mdi mdi-arrow-right ms-1"></i>
                            </a>
                        </div>
                    </Col>
                    <Col md={{ span: 5, offset: 2 }}>
                        <div className="text-md-end mt-3 mt-md-0">
                            <img src={image1} alt="" className="img-fluid" />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Hero;
