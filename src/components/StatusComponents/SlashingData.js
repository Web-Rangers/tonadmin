import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Card, Collapse, Button, Modal, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Moment from 'react-moment';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import useWebSocket, { ReadyState } from 'react-use-websocket';

const ComplaintsList = ({item, complaintsData}) => {
    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen((prevState) => !prevState);
    };
    return (
        complaintsData ?
            <>
                <h5 className="m-0" style={{lineHeight:"1"}}>
                    <Link
                        to="#"
                        className={classNames('d-block pb-1', { collapsed: open !== true })}
                        onClick={toggle}
                        aria-controls={'collapse' + item}
                        aria-expanded={open}>
                        Complaints list <i className="mdi mdi-chevron-down accordion-arrow"></i>
                    </Link>
                </h5>
                <Collapse in={open} appear>
                    <div>
                        {complaintsData.map((complaint,index) => {return <p key={`${item}-${index}`} className="mt-2 mb-0">{complaint.electionId} / suggested fine - {complaint.suggestedFine} / approved - {complaint.approvedPercent}% / <Moment format="HH:mm:ss" unix >{complaint.createdTime}</Moment> / {complaint.isPassed ? <span className="text-success">passed</span> : <span className="text-danger">failed</span>}</p>})}
                    </div>
                </Collapse>
            </>
            :
            <></>
    );
};

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
                        <ComplaintsList item="c1" complaintsData={data} />
                    </div>
                    </>
                }
            </Card.Body>
        </Card>
    )
}
  
export default SlashingData;