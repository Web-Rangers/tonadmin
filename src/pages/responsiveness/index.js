import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Row, Col, Card, Collapse, Button, Modal, Alert } from 'react-bootstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import ElectionsStatus from './ElectionsStatus.js';
import ConfigVotings from './ConfigVotings.js';
import SlashingData from './SlashingData.js';
import DHTserversPerformance from './DHTserversPerformance.js';
import ServerStatusList from "./ServerStatusList.js"

export default function Responsiveness(props){
    const [socketUrl, setSocketUrl] = useState(process.env.REACT_APP_API_URL);
    const [messageHistory, setMessageHistory] = useState([]);
    const {
      sendMessage,
      lastMessage,
      readyState,
    } = useWebSocket(socketUrl, {
        //Will attempt to reconnect on all close events, such as server shutting down
        shouldReconnect: (closeEvent) => true,
      });
    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];    
    const [serversStatusResponse,setServersStatusResponse] = useState([false,false,false,false,false,false]);//False using for preloaders when socket is down and data is not exist
    const [dataDHT,setDataDHT] = useState();
    //FAKE DATA
    const [dataVoting,setDataVoting] = useState();
    const [dataSlashing,setDataSlashing] = useState();

    //FAKE RESPONSE
    useEffect(async () => {
        setDataVoting({count:79});
        setDataSlashing({count:11});
    }, []);

    useEffect(() => {
        if (lastMessage) {
            try{
                setMessageHistory(prev => prev.concat(lastMessage));
                setServersStatusResponse(JSON.parse(lastMessage.data).services);
                var liteservers = JSON.parse(lastMessage.data).liteservers.map(server => {return {ip:server.ip,port:server.port,time:server.time.toFixed(0)+"ms"}});
                setDataDHT(liteservers);
            }
            catch (error) {
                console.error(error);
            }            
        }
    }, [lastMessage, setMessageHistory]);

    return (
        <>
            <Row>
                {serversStatusResponse ? serversStatusResponse.map((server, index) => <Col key={`status_${index}`} lg={4}><ServerStatusList socketState={readyState} serverStatusData={server} /></Col>) : null}
            </Row>
            <Row>
                <Col lg={4}>
                    <ElectionsStatus socketState={readyState} />
                </Col>
                <Col lg={4}>
                    <ConfigVotings socketState={readyState} data={dataVoting} />
                </Col>
                <Col lg={4}>
                    <SlashingData socketState={readyState} data={dataSlashing} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <DHTserversPerformance socketState={readyState} data={dataDHT} />
                </Col>
            </Row>
        </>
    )
}