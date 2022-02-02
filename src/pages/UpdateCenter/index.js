// @flow
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Modal, Button } from 'react-bootstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { APICore } from '../../helpers/api/apiCore';
import Lottie from "lottie-react";

const api = new APICore();


const UpdateCenter = (): React$Element<React$FragmentType> => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [status, setStatus] = useState(0);
    const [statusdata, setStatusdata] = useState(0);
    const [validatorAddress, setValidatorAddress] = useState(localStorage.getItem('validatorAddress'));
    const [show, setShow] = useState(0);

  //  localStorage.setItem('validatorAddress', 'kf8uw5J61EpzZiONm7hcz23nQMn7BxIE7d1hiM2xHXALek9I')
    useEffect(async () => {
      //  send()
        getStatus()

    }, []);

    const getStatus = async () =>{
      setStatus(false)
      const result = await api.sendJRPC('/', 'CheckUpdates')
      console.log('resp')
      setStatus(result.data.result)
    }

    const updateMTC = async () => {
      setShow(true)
      console.log('test')
      const result = await api.sendJRPC('/', 'updateMTC');
      const result2 = await api.sendJRPC('/', 'CheckUpdates')
      console.log(result)
      getStatus()
    }
    const updateJR = async () => {
            setShow(true)
        console.log('test')
     const result = await api.sendJRPC('/', 'updateJR');
     const result2 = await api.sendJRPC('/', 'CheckUpdates')
      if(result2.data.ruslt[1]){

      }
      getStatus()
    }

    return (
        <>
            <Row>
                <Col>
                    <div className="page-title-box">
                        <div className="page-title-right">
                            <form className="d-flex">
                                <button className="btn btn-primary ms-2">
                                    <i className="mdi mdi-autorenew"></i>
                                </button>
                            </form>
                        </div>
                        <h4 className="page-title" >Update center</h4>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={6}>
                  {!status ?
                    <Card className="tilebox-one">
                      <Card.Body>
                          <Skeleton count={5} />
                      </Card.Body>
                    </Card>
                    :
                    <Card className="tilebox-one">
                        <Card.Body>
                            <h4 className="mt-0">MyTonCtrl</h4>
                            <h3 className="my-3" id="active-users-count">
                                {status[0] ?
                                  <>Nothing to update</>
                                  :
                                  <>Update required</>
                                }
                            </h3>
                            {!status[0] ?
                            <button onClick={updateMTC} className="btn btn-primary">Update</button>
                            : ''}
                        </Card.Body>
                    </Card>
                  }
                </Col>

                <Col lg={6}>
                  {!status ?
                    <Card className="tilebox-one">
                      <Card.Body>
                          <Skeleton count={5} />
                      </Card.Body>
                    </Card>
                    :
                    <Card className="tilebox-one">
                        <Card.Body>
                            <h4 className="mt-0">MyTon JSONRPC</h4>
                            <h3 className="my-3" id="active-users-count">
                              {status[1] ?
                                <>Nothing to update</>
                                :
                                <>Update required</>
                              }
                            </h3>
                            {!status[1] ?
                            <button onClick={updateJR} className="btn btn-primary">Update</button>
                            : ''}
                        </Card.Body>
                    </Card>
                  }
                </Col>
            </Row>
            <Modal show={show} onHide={() => {setShow(!show); }} className="bg-modal-dialog-centered">
              <Modal.Body className="text-center">
                <span>
                  <br/><br/>
                  <h4>Updating in progress..</h4>
                  <Button className="mt-2" onClick={() => setShow(!show)}>OK</Button>
                </span>
              </Modal.Body>
            </Modal>
        </>
    );
};

export default UpdateCenter;
