// @flow
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import classNames from 'classnames';

type ServicesProps = {
    services: {
        icon: string,
        title: string,
        description: string,
    }[],
};

const Services = ({ services }: ServicesProps): React$Element<React$FragmentType> => {
    return (
        <>
            <section className="py-5" id="services-section">
                <Container>
                    <Row className="py-4">
                        <Col>
                            <div className="text-center">
                                <h1 className="mt-0">
                                    <i className="mdi mdi-infinity"></i>
                                </h1>
                                <h3>
                                    The admin is fully <span className="text-primary">responsive</span> and easy to{' '}
                                    <span className="text-primary">customize</span>
                                </h3>
                                <p className="text-muted mt-2">
                                    The clean and well commented code allows easy customization of the theme.It's
                                    designed for
                                    <br />
                                    describing your app, agency or business.
                                </p>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        {services.map((feature, index) => {
                            return (
                                <Col lg={4} key={index}>
                                    <div className="text-center p-3">
                                        <div className="avatar-sm m-auto">
                                            <span className="avatar-title bg-primary-lighten rounded-circle">
                                                <i className={classNames('text-primary', 'font-24', feature.icon)}></i>
                                            </span>
                                        </div>
                                        <h4 className="mt-3">{feature.title}</h4>
                                        <p className="text-muted mt-2 mb-0">{feature.description}</p>
                                    </div>
                                </Col>
                            );
                        })}
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Services;