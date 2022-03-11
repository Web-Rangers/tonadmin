// @flow
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Modal, Alert } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import Select from 'react-select';
import classNames from 'classnames';
import Lottie from "lottie-react";
import eggAnimation from "../../../assets/egg.json";
import keyAnimation from "../../../assets/key.json";
import walletAnimation from "../../../assets/wallet.json";
import oopsAnimation from "../../../assets/oops.json";
import boomstickAnimation from "../../../assets/boomstick.json";

// components

import Table from '../../../components/Table';

import { APICore } from '../../../helpers/api/apiCore';

const api = new APICore();

const AwModal = ({ props }) => {
    useEffect(async () => {
      setShow(props.show)
    }, [props]);
    const [show, setShow] = useState(props.show);

    return (
      <Modal show={show} onHide={() => {setShow(!show); props.onHide}} className="bg-modal-dialog-centered">
        <Modal.Body className="text-center">
          {(props.balance > 0 || props.status) ?
          <>
            {!props.status ?
              <>
                <Lottie className="lottie-modal" loop={true} animationData={keyAnimation} />
                <br/><br/>
                <p>Activating wallet "{props.wallet}"...</p>
              </>
            :
              <>
                {props.status == 'success' ?
                  <>
                    <Lottie className="lottie-modal" loop={true} animationData={boomstickAnimation} />
                    <br/><br/>
                    <p>Wallet was successfully activated</p>
                    <Button className="mt-2" onClick={() => setShow(!show)}>Great</Button>
                  </>
                :
                  <>
                    <Lottie className="lottie-modal" loop={true} animationData={oopsAnimation} />
                    <br/><br/>
                    <p>Something went wrong. Please try again later</p>
                    <Button className="mt-2" onClick={() => setShow(!show)}>OK</Button>
                  </>
                }
              </>
            }
          </>
          :
          <span>
            <Lottie className="lottie-modal" loop={false} animationData={walletAnimation} />
            <br/><br/>
            <p>To activate your wallet, you should have at least 0.1 TON on your balance. Please send some TONs to your wallet "{props.wallet}" and retry the activation.</p>
            <Button className="mt-2" onClick={() => setShow(!show)}>OK</Button>
          </span>}
        </Modal.Body>
      </Modal>
    )
}

const Wallets = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addButton, setAddButton] = useState(0);
    const [createModal, setCreateModal] = useState(false);
    const [awModal, setAwModal] = useState({
      show: false,
      wallet: null,
      balance: null,
      status: null
    });
    const [walletName, setWalletName] = useState(0);
    const [workchain, setWorkchain] = useState(0);
    const [success, setSuccess] = useState(0);

    const Cell = ({ value }) => {
      let url = "https://tonscan.org/address/" + value;
      return <a target="_blank" href={url}>{value}</a>
    }

    const StatusCell = ({value}) => {
      let status = (value[0] == 'empty' || value[0] == 'uninit') ?
          <button onClick={() => {
              setAwModal({show: true, wallet: value[1], balance: value[2]})
              if(value[2] > 0 && !awModal.status){
                activateWallet(value[1])
              }
              }} variant="link" className="btn btn-link" style={{padding: 0}}>
              activate wallet
          </button>
         : value[0]
      return value[0];
    }

    const columns = [
        {
            Header: 'Name',
            accessor: 'name',
            sort: true,

        },
        {
            Header: 'Status',
            accessor: 'status',
            sort: true,
            Cell: StatusCell
        },
        {
            Header: 'Balance',
            accessor: 'balance',
            sort: true,
        },
        {
            Header: 'Workchain',
            accessor: 'workchain',
            sort: true,
        },
        {
            Header: 'Address',
            accessor: 'address',
            sort: false,
            Cell: Cell,
        },
    ];

    const sizePerPageList = [
        {
            text: '5',
            value: 5,
        },
        {
            text: '10',
            value: 10,
        },
        {
            text: '25',
            value: 25,
        }
    ];


    const activateWallet = async (wallet) => {
        const result = await api.sendJRPC('/', 'aw', [wallet])
        console.log(result)
        if(result.data.result){
          setAwModal({show: true, status: 'success'})
          updateWallets()
        }else{
          setAwModal({show: true, status: 'error'})
        }
        return false;
    }

    const toggleCreate = () => {
        setSuccess(false)
        setCreateModal(!createModal);
    };

    useEffect(async () => {
      updateWallets()
    }, []);

    const updateWalletName = (event) => {
      setWalletName(event.target.value)
    }
    const updateWorkchain = (option) => {
      setWorkchain(option.value)
    }

    const createWallet = async (e) => {
      e.preventDefault();
      setLoading(true)
      setAddButton(false)
      const result = await api.sendJRPC('/', 'nw', [walletName, workchain])
      if(result && result.data && result.data.result){
          setSuccess(true)
          updateWallets()
      }else{
          setData([]);
          setAddButton(false)
          setLoading(false)
      }
    }


    const updateWallets = async () =>{
      setData([]);
      setLoading(true)
      const result = await api.sendJRPC('/', 'wl')

      if(result && !result.error && result.data && result.data.result !== "empty"){
        let data = result.data.result
          let tableData = []
            Object.keys(data).forEach(row => {
              tableData.push({
                  name: data[row].name,
                  status: [data[row].status, data[row].name, data[row].balance],
                  workchain: data[row].workchain,
                  balance: data[row].balance,
                  address: data[row].addr,
              })
            })
            setData(tableData);
      }else{
          setData([]);
          setAddButton(false)
      }
      setLoading(false)
    }

    return (
        <>
          <Row>
              <Col>
                  <Card>
                      <Card.Body>
                          <h4 className="header-title">Validator wallets list</h4>
                          <Table
                              columns={columns}
                              data={data}
                              pageSize={5}
                              sizePerPageList={sizePerPageList}
                              isSortable={true}
                              pagination={false}
                          />
                          {loading ?
                            <Skeleton count={3} height={15} />
                            :
                            <div className="text-center">
                              {/*    <Row>
                                <Col lg={12}>
                                  <Button onClick={toggleCreate} variant="link" style={{width: 200}}>Create new wallet</Button>
                                </Col>
                              </Row>
                              */}
                            </div>
                          }
                          {addButton ?
                            <div className="text-center">
                              <Row>
                                <Col lg={12}>
                                  <p className="text-muted m-0">You don't have any local wallets</p>
                                </Col>
                                <Col lg={12}>
                                  <Button onClick={toggleCreate} variant="link" style={{width: 200}}>Create your first wallet</Button>
                                </Col>
                              </Row>

                            </div>
                            :
                            ""
                          }
                      </Card.Body>
                  </Card>
              </Col>
          </Row>
          <Modal show={createModal} onHide={toggleCreate} className="bg-modal-dialog-centered">
              <Modal.Body >
                  {success ?
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 40, flexDirection: 'column'}}>
                      <div className="text-center mb-4">
                        <h4 className="header-title">Wallet successfully created!</h4>
                      </div>
                      <Lottie className="lottie-modal" loop={false} animationData={eggAnimation} />
                      <br/><br/>
                      <Button className="mt-2" onClick={toggleCreate}>Got it</Button>
                    </div>
                    :
                    <div>
                      <div className="text-center mt-2 mb-4">
                        <h4 className="header-title">Create new wallet</h4>
                      </div>
                      <form className="ps-3 pe-3" action="#">
                        <Alert variant="info">
                            <i className={classNames('dripicons-information', 'me-2')}></i>Wallet private key will be saved in your server <strong>local</strong> storage.
                        </Alert>
                          <div className="mb-3">
                              <label htmlFor="walletname" className="form-label">
                                  Wallet name
                              </label>
                              <input
                                  onChange={updateWalletName}
                                  className="form-control"
                                  type="name"
                                  id="walletname"
                                  required={true}
                                  placeholder="Millionaire's wallet"
                              />
                          </div>

                          <div className="mb-3">
                              <label htmlFor="workchain" className="form-label">
                                  Workchain id
                              </label>
                              <Select
                                  className="react-select"
                                  onChange={updateWorkchain}
                                  id="workchain"
                                  placeholder="Select workchain id"
                                  classNamePrefix="react-select"
                                  options={[
                                      { value: '0', label: 'Lower comissions: 0' },
                                      { value: '-1', label: 'Higher comissions: -1' },
                                  ]}></Select>
                          </div>

                         <div className="mb-3 text-center">
                              <button onClick={createWallet} className="btn btn-rounded btn-primary" >
                                  Create
                              </button>
                          </div>
                      </form>
                    </div>
                }
              </Modal.Body>
          </Modal>
          <AwModal show={awModal.show} props={awModal}  onHide={() => {
              console.log('closed');
            setAwModal({show: false})}} />
        </>
    );
};



export default Wallets;
