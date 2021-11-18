import React from 'react';
import { Row, Col, Card, Collapse, Button, Modal, Alert } from 'react-bootstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export default function BridgeContainer({socketState, data, children}) {
    
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
                            {children}                        
                        </Row>    
                    </>
                }
            </Card.Body>
        </Card>
    )
}
