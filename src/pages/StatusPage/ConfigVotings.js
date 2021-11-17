import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Card, Collapse, Button, Modal, Alert } from 'react-bootstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import useWebSocket, { ReadyState } from 'react-use-websocket';

const ConfigVotings = ({socketState, data}) => {  

    return (
        <Card>
            <Card.Body>
                {   (!data)||(socketState!=ReadyState.OPEN) ?
                    <SkeletonTheme>
                        <Skeleton count={5} />
                    </SkeletonTheme>
                    :
                    <>
                    <h4 className="header-title">Offers count</h4>
                    <div>
                        <h3 className="mt-3 mb-3">{Object.keys(data).length}</h3>
                        <p className="mb-0 text-muted">
                            <span className="text-nowrap">Offers</span>
                        </p>
                    </div>
                    </>
                }
            </Card.Body>
        </Card>
    )
}
  
export default ConfigVotings;