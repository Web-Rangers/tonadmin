// @flow
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button} from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import Select from 'react-select';

// components


import { APICore } from '../../helpers/api/apiCore';


import TimeLine from './TimeLine';

const api = new APICore();

const ElectionsTimeline = (props) => {
    const [systemData, setSystemData] = useState([]);
    const [percents, setPercents] = useState([]);
    const [diskNames, setDiskNames] = useState([]);

    return (
        <>
          <Row>
              <Col>
                <Card>
                    <Card.Body>
                        <h4 className="header-title">Elections Timeline</h4>
                        {props.data ?
                          <TimeLine data={props.data} />
                          :
                          <Skeleton count={5}/>
                        }
                  </Card.Body>
                </Card>
              </Col>
          </Row>

        </>
    );
};



export default ElectionsTimeline;
