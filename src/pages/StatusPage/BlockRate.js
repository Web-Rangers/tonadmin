import React from 'react';
import { Row, Col, Card, Collapse, Button, Modal, Alert } from 'react-bootstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export default function BlockRate({socketState, data}) {
    
    return (
        <Card>
            <Card.Body>
                {   (!data)||(socketState!=ReadyState.OPEN) ?
                    <SkeletonTheme>
                        <Skeleton count={5} />
                    </SkeletonTheme>
                    :
                    <>
                    <h4 className="header-title">Block rate</h4>
                    <div>
                        <h3 className="mt-3 mb-3">{data.last_block}</h3>
                        <p className="mb-0 text-muted">
                            <span className="text-nowrap">Last block</span>
                        </p>
                    </div>
                    </>
                }
            </Card.Body>
        </Card>
    )
}