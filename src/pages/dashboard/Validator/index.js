// @flow
import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { APICore } from '../../../helpers/api/apiCore';

// components
import HyperDatepicker from '../../../components/Datepicker';

import Statistics from './Statistics';
import IncomeChart from './IncomeChart2';
import SystemInfo from '../../SystemInfo';
import ElectionsTimeLine from '../../ElectionsTimeline';
import Wallets from './Wallets';
import History from '../../AddressHistory';
const api = new APICore();


const ValidatorDashboardPage = (): React$Element<React$FragmentType> => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [status, setStatus] = useState(0);
    const [statusdata, setStatusdata] = useState(0);
    const [validatorAddress, setValidatorAddress] = useState(localStorage.getItem('validatorAddress'));


    useEffect(async () => {
        getStatus()
    }, []);



    const getStatus = async () =>{
      setStatus(false)
      const result = await api.sendJRPC('/', 'status')
      if(result && !result.error && result.data &&  result.data.result !== "empty"){
        let data = result.data.result

          setValidatorAddress(data.validatorWalletAddr)
          localStorage.setItem('validatorAddress', data.validatorWalletAddr)
          let unixTime = data.validatorStatus.unixtime;

          if(parseFloat(data.validatorEfficiency) > 0)
              data.validatorEfficiency =  <span className="text-success">{data.validatorEfficiency}%</span>
          if(parseFloat(data.validatorEfficiency) == 0)
            data.validatorEfficiency = <span className="text-warning">{data.validatorEfficiency}%</span>

          setStatusdata(data)

          /*  Object.keys(data).forEach(row => {
              tableData.push({
                  name: data[row].name,
                  status: data[row].status,
                  workchain: data[row].workchain,
                  balance: data[row].balance,
                  address: data[row].addr,
              })
            })*/

      }else{
          console.log("ERROR")
      }
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
                        <h4 className="page-title" >Analytics</h4>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col lg={5} xl={4} xxl={3}>
                    <Statistics statusData={statusdata}/>
                </Col>

                <Col lg={7} xl={8} xxl={9} >
                    <IncomeChart wallet={validatorAddress}/>
                </Col>
            </Row>
            <Row>
              <Col lg={12} md={12} xl={12} xxl={12}>
                  <SystemInfo />
              </Col>
            </Row>
            <Row>
              <Col lg={12} md={12} xl={12} xxl={12}>
                  <ElectionsTimeLine data={statusdata} />
              </Col>
            </Row>
            <Row>
              <Col lg={12} md={12} xl={12} xxl={12}>
                  <Wallets />
              </Col>
            </Row>
            <Row>
            <Col lg={12}>
              <History wallet={validatorAddress} />
            </Col>

            </Row>
        </>
    );
};

export default ValidatorDashboardPage;
