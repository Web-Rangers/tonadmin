// @flow
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Modal, Button, Toast } from 'react-bootstrap';
import Spinner from '../../components/Spinner';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { APICore } from '../../helpers/api/apiCore';
import boomstickAnimation from "../../assets/boomstick.json";
import oopsAnimation from "../../assets/oops.json";
import Lottie from "lottie-react";

const api = new APICore();
const UpdateCenter = (): React$Element<React$FragmentType> => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [status, setStatus] = useState(0);
    const [updateStatus, setUpdateStatus] = useState(null);
    const [statusdata, setStatusdata] = useState(0);
    const [validatorAddress, setValidatorAddress] = useState(localStorage.getItem('validatorAddress'));
    const [show, setShow] = useState(false);
    //const [showToast, setShowToast] = useState(Boolean(localStorage.getItem('updateToast')));
    const [showToast, setShowToast] = useState(true);
    useEffect(async () => {
        getStatus()
    }, []);

    const getStatus = async () => {
      setStatus(false)
      const result = await api.sendJRPC('/', 'CheckUpdates')
      //  setStatus([null, null])

      setStatus(result.data.result)

    }

    const update = async (service) => {
      setUpdateStatus(null);
      setShow(true)
      const result = await api.sendJRPC('/', 'Update' + service, ['']);
      console.log(result.data.result.message)
      if(result.data.result.message == 'Method not found"}}' ){
        setStatus([null, null])
      }
      const result2 = await api.sendJRPC('/', 'CheckUpdates')
      if(result.data.result == 'Update - {green}OK{endc}'){
        setUpdateStatus(true)
      }else{
        setUpdateStatus(false)
      }

      setStatus(false)

    }

    const closeToast = () => {
      let toast = localStorage.setItem('updateToast', 'true')
      setShowToast(true)
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
                        <Toast
                        className="d-flex align-items-center text-white bg-primary border-0 mb-3"
                        style={{ width: '100%'}}
                        show={!showToast}
                        onClose={() => closeToast()}
                        >
                        <Toast.Body>Update center allows you to upgrade the validator software directly from TonAdmin without having to install updates from the MyTonCtrl console.</Toast.Body>
                        <Button
                          variant=""
                          onClick={() => closeToast()}
                          className="btn-close btn-close-white ms-auto me-2"></Button>
                      </Toast>
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
                    <>
                    {(status[0] != null && status[1] != null) ?
                    <Card className="tilebox-one">
                        <Card.Body>
                            <h4 className="mt-0">MyTonCtrl</h4>
                            <h3 className="my-3" id="active-users-count">
                                {!status[1] ?
                                  <>Nothing to update</>
                                  :
                                  <>Update required</>
                                }
                            </h3>
                          {/*  {status[1] == true ?
                            <button onClick={() => update('MTC')} className="btn btn-primary">Update</button>
                            : ''}*/}
                        </Card.Body>
                    </Card>
                    :
                    <Card className="tilebox-one">
                        <Card.Body>
                            <h3 className="mt-0">Update center is not available</h3>
                            <h5 className="my-3" id="active-users-count">
                              Please upgrade JR module in MytonCtrl to be able to get updates from TonAdmin.
                            </h5>
                            <p>
                              To upgrade JR module run MyTonCtrl on your validator server and upgrade JR:
                            </p>
                              <code>
                                > MyTonCtrl
                                <br/>
                                MyTonCtrl > installer
                                <br/>
                                MyTonInstaller > enable JR
                              </code>

                        </Card.Body>
                    </Card>
                    }
                    </>
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
                    <>
                    {(status[0] != null && status[1] != null) ?
                    <Card className="tilebox-one">
                        <Card.Body>
                            <h4 className="mt-0">MyTon JSONRPC</h4>
                            <h3 className="my-3" id="active-users-count">
                              {!status[0] ?
                                <>Nothing to update</>
                                :
                                <>Update required</>
                              }
                            </h3>
                          {/*  {status[0] == true ?
                            <button onClick={() => update('JR')} className="btn btn-primary">Update</button>
                            : ''}*/}
                        </Card.Body>
                    </Card>
                    : '' }
                    </>
                  }
                </Col>
            </Row>
            <Modal show={show} onHide={() => {setShow(!show); }} className="bg-modal-dialog-centered">
              <Modal.Body className="text-center">
                {status ?
                  <span>
                    <h4>Updating in progress..</h4>
                    <Button color="primary" className="mt-2" disabled>
                        <Spinner className="spinner-border-sm me-1" tag="span" color="white" />
                        Loading...
                    </Button>
                  </span>
                  :
                  <>
                  {updateStatus ?
                    <>
                      <h4>Successfully updated</h4>
                      <Lottie className="lottie-modal" loop={true} animationData={boomstickAnimation} />
                      <br/>
                      <Button color="primary" className="mt-3" onClick={() => {setShow(!show); getStatus()}}>
                          Great
                      </Button>
                    </>
                  :
                  <>
                    <h5>Something went wrong. Please try later or update manually.</h5>
                    <Lottie className="lottie-modal" animationData={oopsAnimation} />
                    <br/>
                    <Button color="primary" className="mt-3" onClick={() => {setShow(!show);  getStatus()}}>
                        Ok
                    </Button>
                  </>
                }
                </>
                }
              </Modal.Body>
            </Modal>
        </>
    );
};

export default UpdateCenter;
