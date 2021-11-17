import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Card, Collapse, Button, Modal, Alert } from 'react-bootstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import StatisticsWidget from '../../components/StatisticsWidget';
import Moment from 'react-moment';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import { APICore } from '../../helpers/api/apiCore';
Moment.globalFormat = 'DD.MM.YYYY HH:mm';
const api = new APICore();

const ElectionsStatus = ({socketState}) => {       
    const selectedDate = useRef(new Date()); 
    const [statusdataElections,setStatusdataElections] = useState();

    useEffect(async () => {
        getElectionsStatus();
        selectedDate.current = new Date();
    }, [socketState]);

    const getElectionsStatus = async () =>{
        const result = await api.sendJRPC('/', 'status')
        if(result && !result.error && result.data &&  result.data.result !== "empty"){
            let data = result.data.result
            setStatusdataElections(data);  
        }else{
            console.log("JRPC ERROR")
        }
    }

    return (
        <>
        {(!statusdataElections)||(socketState!=ReadyState.OPEN) ?
            <Card> 
              <Card.Body>
                <SkeletonTheme>
                    <Skeleton count={5} />
                </SkeletonTheme>
              </Card.Body>
            </Card>
            :
            <StatisticsWidget
                icon={`mdi mdi-vote-outline bg-white ${(statusdataElections.electionId)&&(selectedDate.current<statusdataElections.endElection) ? "text-success" : "text-warning"}`}
                description={(statusdataElections.electionId)&&(selectedDate.current<statusdataElections.endElection) ? "OPEN" : "CLOSED"}
                title="Election status"

                stats={(statusdataElections.electionId)&&(selectedDate.current<statusdataElections.endElection) ? "OPEN" : "CLOSED"}
                trend={{
                    textClass: 'badge badge-light-lighten',
                    icon: 'mdi mdi-clock',
                    value: (statusdataElections.electionId)&&(selectedDate.current<statusdataElections.endElection) ? 'End of elections: ' : "Next elections: ",
                    time: (statusdataElections.electionId)&&(selectedDate.current<statusdataElections.endElection) ? <Moment unix >{statusdataElections.endElection}</Moment> : <Moment unix >{statusdataElections.startNextElection}</Moment>,
                }}
                bgclassName={(statusdataElections.electionId)&&(selectedDate.current<statusdataElections.endElection) ? "bg-success" : "bg-warning"}
                textClass="text-white">
            </StatisticsWidget>
        }
        </>
    )
}
  
export default ElectionsStatus;