import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Card, Collapse, Button, Modal, Alert } from 'react-bootstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import useWebSocket, { ReadyState } from 'react-use-websocket';

const Validators = ({socketState, data}) => {       
    
    return (
        <Card>
            <Card.Body>
                <h4 className="header-title">Validators</h4>
                {   (!data)||(socketState!=ReadyState.OPEN) ?
                    <div className="mt-2">
                        <SkeletonTheme>
                            <Skeleton count={4} />
                        </SkeletonTheme>
                    </div>
                    :
                    <div>
                        <h3 className="mt-3 mb-3">{data.active}/{data.total}</h3>
                        <p className="mb-0 text-muted">
                            <span className="text-nowrap">Active/Total</span>
                        </p>
                    </div>
                }
            </Card.Body>
        </Card>
    )
}
  
export default Validators;