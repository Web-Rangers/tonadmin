import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Card, Collapse, Button, Modal, Alert } from 'react-bootstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import StatisticsWidget from '../../components/StatisticsWidget';
import Moment from 'react-moment';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import { APICore } from '../../helpers/api/apiCore';
Moment.globalFormat = 'DD.MM.YYYY HH:mm';
const api = new APICore();

const ElectionsStatus = ({socketState, data}) => {       
    const selectedDate = useRef(new Date()/1000);

    useEffect(async () => {
        selectedDate.current = new Date()/1000;
    }, [data]);

    return (
        <>
        {(!data)||(socketState!=ReadyState.OPEN) ?
            <Card> 
              <Card.Body>
                <SkeletonTheme>
                    <Skeleton count={5} />
                </SkeletonTheme>
              </Card.Body>
            </Card>
            :
            <>
            <StatisticsWidget
                icon={`mdi mdi-vote-outline bg-white ${(selectedDate.current<data.end) ? "text-success" : "text-warning"}`}
                description={(selectedDate.current<data.end) ? "OPEN" : "CLOSED"}
                title="Election status"

                stats={(selectedDate.current<data.end) ? "OPEN" : "CLOSED"}
                trend={{
                    textClass: 'badge badge-light-lighten',
                    icon: 'mdi mdi-clock',
                    value: (selectedDate.current<data.end) ? 'End of elections: ' : "Next elections: ",
                    time: (selectedDate.current<data.end) ? <Moment unix >{data.end}</Moment> : <Moment unix >{data.next}</Moment>,
                }}
                bgclassName={(selectedDate.current<data.end) ? "bg-success" : "bg-warning"}
                textClass="text-white">
            </StatisticsWidget>
            </>
        }        
        </>
    )
}
  
export default ElectionsStatus;