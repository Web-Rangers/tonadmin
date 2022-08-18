// @flow
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Modal, Alert } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import IncomeChart from '../dashboard/Validator/IncomeChart2';
import Chart from './chart'
import ComplaintsChart from './complaintsChart'
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import axios from 'axios';
import { APICore } from '../../helpers/api/apiCore';
import ComplaintsList from './complaints';

const api = new APICore();

// components

import Table from '../../components/Table';

const columns = [
    {
        Header: 'Wallet / ADNL',
        accessor: 'adnlAddr',
        sort: true,
        Cell: Wallet,
    },
    {
        Header: 'Stake',
        accessor: 'stake',
        sort: true,
    },
    {
        Header: 'Weight',
        accessor: 'weight',
        sort: true,
    }

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



function Wallet({ value }) {
  let url = "/metrics/info?address=" + value;
  if(value.length <= 48){
    return <a target="_blank" href={url}>{value}</a>
  }else{
    return value;
  }
}




const ValidatorsList = (props): React$Element<any> => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [wallet, setWallet] = useState();
    const [cycles, setCycles] = useState(0);
    const [currentCycle, setCurrentCycle] = useState(0);
    const [cyclesList, setCyclesList] = useState()
    const [cyclesCount, setCyclesCount] = useState()
    const { address } = useParams()

    const toggleCreate = () => {
        setCreateModal(!createModal);
    };

    useEffect(async () => {
      updateVL()
    }, []);

    const updateVL = async () => {
        api.get('https://elections.toncenter.com/getElections?return_participants=false&offset=0&limit=200').then(response => {
            setCyclesList(response.data)
            setCurrentCycle(response.data[0].election_id);
        })
        api.get(`https://elections.toncenter.com/getValidationCycles?${address.length == 64 ? 'adnl_address' : 'wallet_address'}=${address}&return_participants=false&offset=0&limit=1000000000`).then(response => {
            setCycles(response.data)
            setWallet(response.data[0].cycle_info.validators[0].wallet_address)
        })
    }

    const setLastFine = async (id) => {
        console.log(cycles)
        setCyclesCount(cycles.findIndex((x) => {if(x.cycle_id == id.election_id[0]){return x} }).toString())
    }
    return (
        <>
        <Row>
            <Col>
                <Card className="tilebox-one">
                    <Card.Body>
                        <i className="mdi mdi-console-network-outline float-end"></i>
                        <h6 className="text-uppercase mt-0">Number of completed cycles</h6>
                        <h2 className="my-2" id="active-users-count">
                            {cycles.length}
                        </h2>

                        <p className="mb-0 text-muted">
                            <span className="text-nowrap">Cycles in a row without penalty: {cyclesCount ? cyclesCount : cycles.length}</span>
                        </p>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card className="tilebox-one">
                    <Card.Body>
                        <i className="mdi mdi-console-network-outline float-end"></i>
                        <h6 className="text-uppercase mt-0">Current cycle id</h6>
                        <h2 className="my-2" id="active-users-count">
                            {currentCycle}
                        </h2>

                    </Card.Body>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col>
              <h4 className="header-title mb-3">Validator info</h4>
              {wallet &&
                  <IncomeChart wallet={wallet}/>
              }
            </Col>
        </Row>

        <Row className="pt-5">
          <Col>
              <Chart title="Validator stake overview" wallet={address}/>
          </Col>
        </Row>
        <Row>
          <Col>
              <Chart title="Validator weight overview" weight={true} wallet={address}/>
          </Col>
        </Row>


        <Row>
          <Col>
              <ComplaintsChart wallet={address}/>
          </Col>
        </Row>
        <Row>
          <Col>
              {cycles &&
              <ComplaintsList setLastFine={setLastFine} cycle={currentCycle} wallet={address}/>
              }
          </Col>
        </Row>
        </>
    );
};

export default ValidatorsList;
