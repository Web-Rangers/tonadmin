import React, { useState } from 'react';
import { Row, Col, Card, Collapse, Button, Modal, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import classNames from 'classnames';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const PagesList = ({item, pagesData}) => {
    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen((prevState) => !prevState);
    };

    return (
        <>
            <h5 className="m-0">
                <Link
                    to="#"
                    className={classNames('d-block pb-1', { collapsed: open !== true })}
                    onClick={toggle}
                    aria-controls={'collapse' + item}
                    aria-expanded={open}>
                    Pages list <i className="mdi mdi-chevron-down accordion-arrow"></i>
                </Link>
            </h5>
            <Collapse in={open} appear>
                <div>
                    {pagesData.pages.map((page,index) => {return <p key={`${item}-${index}`} className="mt-2 mb-0"><a target="_blank" href={page.url}>{page.name}</a> / status - {page.response_status==200 ? <span className="text-success">{page.response_status}</span> : <span className="text-danger">{page.response_status}</span>} / ping - {page.response_time}ms</p>})}
                </div>
            </Collapse>
        </>
    );
};

const ServerStatusList = ({socketState, serverStatusData}) => {

    return (
        <Card>
            <Card.Body>
                {
                    (socketState!=ReadyState.OPEN)||(!serverStatusData) ?
                    <SkeletonTheme>
                        <Skeleton count={5} />
                    </SkeletonTheme>
                    :
                    <>
                    <h4 className="header-title">{serverStatusData.service_name} status</h4>
                    <div>
                        {serverStatusData.pages.filter((page) => page.response_status==200 ? page.response_status : null ).length/serverStatusData.pages.length == 1 ? <h3 className="mt-3 mb-3 text-success">ONLINE 100%</h3> : serverStatusData.pages.filter((page) => page.response_status==200 ? page.response_status : null ).length/serverStatusData.pages.length > 0 ? <h3 className="mt-3 mb-3 text-warning">ONLINE {(serverStatusData.pages.filter((page) => page.response_status==200 ? page.response_status : null ).length/serverStatusData.pages.length*100).toFixed(0)}%</h3> : <h3 className="mt-3 mb-3 text-danger">OFFLINE</h3> }
                        <PagesList item="1" pagesData={serverStatusData} />
                    </div>
                    </>  
                }
            </Card.Body>
        </Card>
    );
};

export default ServerStatusList;