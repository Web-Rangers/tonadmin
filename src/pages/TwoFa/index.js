// @flow
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button} from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import Select from 'react-select';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import GoogleAuth from '../../assets/images/google-authenticator.svg';
import gem from '../../assets/images/gem.png';
import successIcon from '../../assets/images/logout-icon.svg';

import {VerticalForm, FormInput } from '../../components/';

import { QRCode } from 'react-qrcode-logo';


import { APICore } from '../../helpers/api/apiCore';

const api = new APICore();

const TwoFa = (props) => {
    const [otpStatus, setOtpStatus] = useState(false);
    const [setupOTP, setSetupOTP] = useState(false);
    const [qrcode, setQrcode] = useState(false);
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [incorrect, setIncorrect] = useState(false);
    const [disableOTP, setDisableOTP] = useState(false);
    const [skeleton, setSkeleton] = useState(true);

    useEffect(async () => {
      getOTPStatus()
    }, []);

    const getOTPStatus = async () => {
      const response = await api.sendJRPC('/', 'GetOTPStatus')
      if(response.data.result){  
        setOtpStatus(response.data.result)
      }
      setSkeleton(false)
    }

    const runSetupOTP = async () => {
      setSetupOTP(true)
      const response = await api.sendJRPC('/', 'SetupOTP')
      if(response.data.result){
        setQrcode(response.data.result)
      }
    }

    const schemaResolver = yupResolver(
        yup.object().shape({
            code: yup.string().required('Please enter 2FA code')
        })
    );

    const onSubmit = async (formData) => {
      setLoading(true)
      const response = await api.sendJRPC('/', 'VerifyOTP', [formData.code])
      if(response.data.result && response.data.result == true){
        setLoading(false)
        setStep(3)
        setIncorrect(false)
      }else{
        setLoading(false)
        setIncorrect(true)
      }
      console.log(formData)
    };


    return (
        <>
          <Row>
              <Col>
                  <h4 className="header-title mb-3">Security</h4>
                  {skeleton ?
                    <Card className="mt-2">
                        <Card.Body>
                          <Skeleton count={5}/>
                      </Card.Body>
                    </Card>
                  :
                  <>
                  {setupOTP ?
                    <Card className="mt-2">
                        <Card.Body>
                          <Row className="justify-content-center pb-4">
                              <Col lg={7} md={10} sm={11}>
                                  <div className="horizontal-steps mt-4 mb-5 pb-4">
                                      <div className="horizontal-steps-content">
                                          <div className={"step-item " + (step == 0 && "current")}>
                                              <span
                                                  data-toggle="tooltip"
                                                  data-placement="bottom"
                                                  title=""
                                                  >
                                                  Download app
                                              </span>
                                          </div>
                                          <div className={"step-item " + (step == 1 && "current")}>
                                              <span
                                                  data-toggle="tooltip"
                                                  data-placement="bottom"
                                                  title=""
                                                  >
                                                  Scan QR code
                                              </span>
                                          </div>

                                          <div className={"step-item " + (step == 2 && "current")}>
                                              <span>Enable google authenticator</span>
                                          </div>
                                          <div className={"step-item " + (step == 3 && "current")}>
                                              <span>Complete</span>
                                          </div>
                                      </div>
                                      <div className="process-line" style={{ width: (step * 33) + '%' }}></div>
                                  </div>
                                  <div className="justify-content-center text-center">
                                  {step == 0 &&
                                    <>
                                      <h4 className="mb-4 pb-2 mt-0">Download and install the Google Authenticator app</h4>
                                      <Row>
                                        <Col sm="6">
                                          <a href="https://apps.apple.com/us/app/google-authenticator/id388497605" target="_blank" className="twofa-link">
                                            <div>
                                              <i className="uil uil-apple" style={{fontSize: "35px", color: "#2f3757"}}></i>
                                              <p className="mb-1">Download from </p>
                                              <p className="fw-bold" style={{fontSize: "16px", color: "#2f3757"}}>App Store</p>
                                            </div>
                                          </a>
                                        </Col>
                                        <Col sm="6">
                                          <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=ru&gl=US" target="_blank" className="twofa-link">
                                            <div>
                                              <i className="uil uil-google-play" style={{fontSize: "35px", color: "#2f3757"}}></i>
                                              <p className="mb-1">Download from</p>
                                              <p className="fw-bold" style={{fontSize: "16px", color: "#2f3757"}}>Google Play</p>
                                            </div>
                                          </a>
                                        </Col>
                                      </Row>
                                    </>
                                  }
                                  {step == 1 &&
                                    <>
                                      <h4 className="mb-4 pb-2 mt-0">Scan this QR code in the google Authenticator app</h4>
                                      <QRCode logoWidth="35" logoHeight="35"  value={qrcode[0]} size="200" logoImage={gem} fgColor="#2f3757" eyeRadius={2} />
                                      <p style={{fontSize: "15px", fontWeight: "bold", color: "#2f3757", marginBottom: "10px"}}>{qrcode[1]}</p>
                                      <span>or enter this code in your app manually</span>
                                    </>
                                  }
                                  {step == 2 &&
                                    <>
                                      <h4 className="mb-4 pb-2 mt-0">Make sure your Google Authenticator is working correctly</h4>
                                      <div className="twofa-form">
                                        <VerticalForm onSubmit={onSubmit} resolver={schemaResolver}>
                                              <FormInput
                                                  label="Google verification code"
                                                  type="text"
                                                  name="code"
                                                  maxLength="6"
                                                  containerClass={'mb-3 d-inline-block px-1'}
                                              />
                                              <Button variant="primary" type="submit" disabled={loading}>
                                                    Check
                                              </Button>
                                        </VerticalForm>
                                        </div>
                                        <div className="twofa-incorrect"> {incorrect &&  <span>Incorrect code. Try again.</span>}</div>
                                    </>
                                  }
                                  {step == 3 &&
                                    <div className="text-center w-75 m-auto">
                                        <h4 className="mb-4 pb-2 mt-0">Google Authenticator Enabled</h4>

                                        <div className="logout-icon m-auto">
                                            <img src={successIcon} alt="" />
                                        </div>
                                        <p className="text-muted mt-4">You have successfully enabled Google 2FA to protect your web panel.</p>
                                        <br />
                                        <a href="/2fa" onClick={() => setupOTP(false)} className="btn btn-primary">Back to security</a>
                                    </div>
                                  }


                                  <Col xs="12">
                                    {step != 0 && step != 3 &&
                                    <Button onClick={() => setStep(step - 1)} className="btn btn-light mt-4 mx-1">Previous step</Button>
                                    }
                                    {(step == 1 || step == 0) &&
                                    <Button onClick={() => setStep(step + 1)} className="btn btn-primary mt-4 mx-1">Next step</Button>
                                    }

                                  </Col>
                                </div>
                              </Col>
                          </Row>

                      </Card.Body>
                    </Card>
                  :
                    <>
                    {otpStatus ?
                      <>
                      { disableOTP ?
                        <Card className="tilebox-one">
                            <Card.Body>
                                <h3 className="mt-0">How to disable 2FA</h3>

                                <p>
                                  For the security reasons, you are not allowed to disable two-factor authentication in TonAdmin panel.
                                  You can turn off two-factor authentication in MyTonCtrl console. To do this, go to the console and run this commands:
                                </p>
                                  <code>
                                    > MyTonCtrl
                                    <br/>
                                    MyTonCtrl > set jsonrpcOTP null
                                  </code>
                            </Card.Body>
                        </Card>
                      :
                        <Card className="mt-2">
                          <Card.Body>
                            <Row className="align-items-center">
                              <Col xs="auto">
                                <img width="70px" src={GoogleAuth} alt="Google Authenticator" />
                              </Col>
                              <Col>
                                <h4 className="my-2">Google 2FA has already enabled</h4>
                                <p className="mb-2">Your account is protected.</p>
                              </Col>
                              <Col className="justify-content-end d-flex">
                                <Button onClick={() => setDisableOTP(true)} className="btn btn-primary">Disable</Button>
                              </Col>
                            </Row>
                        </Card.Body>
                        </Card>
                      }
                      </>
                    :
                    <Card className="mt-2">
                        <Card.Body>
                          <Row className="align-items-center">
                            <Col xs="auto">
                              <img width="70px" src={GoogleAuth} alt="Google Authenticator" />
                            </Col>
                            <Col>
                              <h4 className="my-2">Enable Google 2FA authorization</h4>
                              <p className="mb-2">Protect your account</p>
                            </Col>
                            <Col className="justify-content-end d-flex">
                              <Button onClick={runSetupOTP} className="btn btn-primary">Enable</Button>
                            </Col>
                          </Row>
                      </Card.Body>
                    </Card>
                    }
                    </>
                  }
                  </>
                }
              </Col>
          </Row>
        </>
    );
};



export default TwoFa;
