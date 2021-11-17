import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Card, Collapse, Button, Modal, Alert } from 'react-bootstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import useWebSocket, { ReadyState } from 'react-use-websocket';

const SlashingData = ({socketState, data}) => {       
    
    return (
        <Card>
            <Card.Body>
                {   (!data)||(socketState!=ReadyState.OPEN) ?
                    <SkeletonTheme>
                        <Skeleton count={5} />
                    </SkeletonTheme>
                    :
                    <>
                    <h4 className="header-title">Complaints count</h4>
                    <div>
                        <h3 className="mt-3 mb-3">{Object.keys(data).length}</h3>
                        <p className="mb-0 text-muted">
                            <span className="text-nowrap">Complaints</span>
                        </p>
                    </div>
                    </>
                }
            </Card.Body>
        </Card>
    )
}
  
export default SlashingData;