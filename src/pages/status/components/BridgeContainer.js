import React from 'react';
import { Row, Col, Card, Collapse, Button, Modal, Alert } from 'react-bootstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import BridgeStatus from './BridgeStatus.js';

export default function BridgeContainer({socketState, data}) {
    
    return (
        <Card>
            <Card.Body>
                {(!data)||(socketState!=ReadyState.OPEN) ?
                    <SkeletonTheme>
                        <Skeleton count={5} />
                    </SkeletonTheme>
                    :
                    <>
                        <h4 className="header-title">Bridge Status</h4>                        
                        <Row>          
                            <Col lg={6} align={"center"}>
                                <BridgeStatus status={data.eth} title={"TON/ETH"} />
                            </Col>
                            <Col lg={6} align={"center"}>
                                <BridgeStatus status={data.bsc} title={"TON/BSC"} />
                            </Col>                       
                        </Row>    
                    </>
                }
            </Card.Body>
        </Card>
    )
}
