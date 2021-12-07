import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Card, Collapse, Button, Modal, Alert } from 'react-bootstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import BeatLoader from "react-spinners/BeatLoader";

const Validators = ({socketState, data}) => {       
    
    return (
            <>
                {   (!data)||(socketState!=ReadyState.OPEN) ?
                    <Row style={{marginTop:"-24px"}}>
                        <Col>
                            <div className="page-title-box">
                                <h4 className="page-title" >Validators   <BeatLoader size={10} color="#0088cc" />   <small className=" text-muted text-nowrap">(Active/Total)</small></h4>                                
                            </div>
                        </Col>
                    </Row>
                    :
                    <>
                    <Row style={{marginTop:"-24px"}}>
                        <Col>
                            <div className="page-title-box">
                                <h4 className="page-title" >Validators {data.active}/{data.total} <small className=" text-muted text-nowrap">(Active/Total)</small></h4>                                
                            </div>
                        </Col>
                    </Row>
                    </>
                }
            </>
    )
}
  
export default Validators;