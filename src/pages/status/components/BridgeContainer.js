import React from 'react';
import { Row, Col, Card, Collapse, Button, Modal, Alert } from 'react-bootstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export default function BridgeContainer({socketState, children}) {
    
    return (
        <Card>
            <Card.Body>
                {children}
            </Card.Body>
        </Card>
    )
}
