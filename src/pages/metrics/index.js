// @flow
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Modal, Alert } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import classNames from 'classnames';
import axios from 'axios';
import ComplaintsList from './complaints';
// components

import Table from '../../components/Table';

import { APICore } from '../../helpers/api/apiCore';

const api = new APICore();


const columns = [
    {
        Header: 'Wallet / ADNL',
        accessor: 'adnlAddr',
        sort: true,
        Cell: Wallet,
    },
    {
        Header: 'Link',
        accessor: 'link',
        sort: true,
        Cell: Link
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
  let url = "/metrics/info/" + value;
 // if(value.length <= 48){
    return <a href={url}>{value.substr(0, 10) + '...' + value.substr(50, value.length)}</a>
 // }else{
//    return value;
 // }

}

function Link({ value }) {
  return <a href={"https://tonscan.org/address/"+value}>View on TonScan</a>
}



const ValidatorsList = (): React$Element<any> => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const toggleCreate = () => {
        setCreateModal(!createModal);
    };

    useEffect(async () => {
      updateVL()
    }, []);

    const updateVL = async () =>{
      setLoading(true)
      const result = await api.get('https://elections.toncenter.com/getValidationCycles?return_participants=true&offset=0&limit=1');

      if(result && !result.error && result.data){
        let data = result.data[0].cycle_info.validators
          let tableData = []

            let totalWeight = 0

            data.forEach(row => {
                totalWeight += row.weight
            })

            data.forEach(row => {
              tableData.push({
                  adnlAddr: row.adnl_addr,
                  link: row.wallet_address,
                  stake: (row.stake/10**9).toLocaleString('en-US', {minimumFractionDigits: 2}),
                  weight: (row.weight/totalWeight*100).toFixed(1) + '%',
              })
            })
            setData(tableData);

      }else{
          setData([]);
          setAddButton(true)
      }
      setLoading(false)
    }


    return (
        <>
          <Row>
              <Col>
                <h4 className="header-title mb-3">Current active validators list</h4>
                  <Card className="mt-2">
                      <Card.Body>
                          {data.length > 0 ?
                          <Table
                              isSearchable={true}
                              columns={columns}
                              data={data}
                              sizePerPageList={sizePerPageList}
                              isSortable={true}
                              pagination={true}
                              pageSize={10}
                          />
                          :
                          <Skeleton count={7} />
                          }
                      </Card.Body>
                  </Card>
              </Col>
          </Row>
          <Row>
              <Col>
                  <ComplaintsList/>
              </Col>
          </Row>
        </>
    );
};

export default ValidatorsList;
