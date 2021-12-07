import React from 'react';
import { Row, Col, Card, Collapse, Button, Modal, Alert } from 'react-bootstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export default function TPSinfo({socketState, data}) {
    
    return (
        <Card>
            <Card.Body>
                {   (!data)||(socketState!=ReadyState.OPEN) ?
                    <SkeletonTheme>
                        <Skeleton count={5} />
                    </SkeletonTheme>
                    :
                    <>
                    <h4 className="header-title">Transactions per second</h4>
                    <div>
                        <h3 className="mt-3 mb-3">{data}</h3>
                        <p className="mb-0 text-muted">
                            <span className="text-nowrap">in last 5 minutes</span>
                        </p>
                    </div>
                    </>
                }
            </Card.Body>
        </Card>
    )
}