import React from 'react';
import { Row, Col, Card, Collapse, Button, Modal, Alert } from 'react-bootstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export default function LastBlock({socketState, data}) {
    
    return (
        <Card>
            <Card.Body>
                {   (!data)||(socketState!=ReadyState.OPEN) ?
                    <SkeletonTheme>
                        <Skeleton count={5} />
                    </SkeletonTheme>
                    :
                    <>
                    <h4 className="header-title">Last block</h4>
                    <div>
                        <h3 className="mt-3 mb-3">{data}</h3>
                        <p className="mb-0 text-muted">
                            <a target="_blank" href={`https://ton.sh/block/-1/${data}`} className="text-nowrap">Explore block</a>
                        </p>
                    </div>
                    </>
                }
            </Card.Body>
        </Card>
    )
}