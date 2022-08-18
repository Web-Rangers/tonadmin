// @flow
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Modal, Alert } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import classNames from 'classnames';

import { APICore } from '../../helpers/api/apiCore';

const api = new APICore();

// components

import Table from '../../components/Table';


const columns = [
    {
        Header: 'ADNL',
        accessor: 'adnlAddr',
        sort: true,
        Cell: Wallet,
    },
    {
        Header: 'Fine receiver',
        accessor: 'reward_addr',
        sort: true,
        Cell: Wallet,
    },
    {
        Header: 'Date',
        accessor: 'date',
        sort: true,
    },
    {
        Header: 'Election id',
        accessor: 'election_id',
        sort: true,
        Cell: Election,
    },
    {
        Header: 'Fine',
        accessor: 'fine',
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
 if(value){
     return <a href={url}>{value.substr(0, 10) + '...' + value.substr(40, value.length)}</a>
 }
    return <a href={url}>{value}</a>

 // }else{
//    return value;
 // }

}



function Election({ value }) {
    return <span className={value[1] ? 'text-success' : ''}>{value[0]}</span>
}




const ComplaintsList = (props): React$Element<any> => {
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
      const result = await api.get(`https://elections.toncenter.com/getComplaints?offset=0&limit=100${props.wallet ? (props.wallet?.length == 64 ? ('&adnl_address=' + props.wallet) : ('&wallet_address=' + props.wallet)) : ''}`);

      if(result && !result.error && result.data){
        let data = result.data
          let tableData = []

            data.forEach(row => {
              tableData.push({
                  adnlAddr: row.adnl_addr,
                  date: new Date(row.created_time * 1000).toLocaleDateString('en-GB') ,
                  election_id: [row.election_id, row.election_id == props.cycle],
                  fine: (row.paid/10**9).toFixed(1),
              })
            })
            setData(tableData);

            props.setLastFine && tableData.length > 0 && props.setLastFine(tableData[0])
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
                <h4 className="header-title mb-3">Validators fines</h4>
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
                          <p>No data</p>
                          }
                      </Card.Body>
                  </Card>
              </Col>
          </Row>
        </>
    );
};

export default ComplaintsList;
