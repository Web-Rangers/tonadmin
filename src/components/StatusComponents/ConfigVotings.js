import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Card, Collapse, Button, Modal, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Moment from 'react-moment';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import useWebSocket, { ReadyState } from 'react-use-websocket';

const OffersList = ({item, offersData}) => {
    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen((prevState) => !prevState);
    };

    return (
        offersData ?
            <>
                <h5 className="m-0" style={{lineHeight:"1"}}>
                    <Link
                        to="#"
                        className={classNames('d-block pb-1', { collapsed: open !== true })}
                        onClick={toggle}
                        aria-controls={'collapse' + item}
                        aria-expanded={open}>
                        Offers list <i className="mdi mdi-chevron-down accordion-arrow"></i>
                    </Link>
                </h5>
                <Collapse in={open} appear>
                    <div>
                        {offersData.map((offer,index) => {return <p key={`${item}-${index}`} className="mt-2 mb-0">approved - {offer.approvedPercent}% / {offer.isPassed ? <span className="text-success">passed</span> : <span className="text-danger">failed</span>} / end - <Moment format="HH:mm:ss" unix >{offer.endTime}</Moment> / rounds remaining - {offer.roundsRemaining}</p>})}
                    </div>
                </Collapse>
            </>
            :
            <></>
    );
};

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
                        <OffersList item="o1" offersData={data} />
                    </div>
                    </>
                }
            </Card.Body>
        </Card>
    )
}
  
export default ConfigVotings;