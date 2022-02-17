// @flow
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button} from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import Select from 'react-select';

// components


import { APICore } from '../../helpers/api/apiCore';

import Gauge from './Gauge';
import GaugeDisks from './GaugeDisks';
import DiskUsage from './DiskUsage';

const api = new APICore();

const SystemInfo = (props) => {
    const [systemData, setSystemData] = useState([]);
    const [percents, setPercents] = useState([]);
    const [diskNames, setDiskNames] = useState([]);

    useEffect(async () => {
      getData()
      setInterval(getData, 5000)
    }, []);

    const getData = async () => {
      const response = await api.sendJRPC('/', 'getSystemLoad')
      if(response.data.result.disksLoadPercentAvg){
        setSystemData(response.data.result)
        let data = response.data.result
        let diskNames = Object.keys(data.disksLoadPercentAvg);
        let percents = []
        Object.values(data.disksLoadPercentAvg).forEach(val => {
          percents.push(val[0])
        });
        setDiskNames(diskNames)
        setPercents(percents)
        console.log(systemData.memory)
      }else{
        setSystemData([1])
      }
    }

    return (
        <>
          <Row>
              <Col>
                {systemData.length == 0 || (systemData && systemData.cpu_load) ?
                  <Card>
                      <Card.Body>
                          <h4 className="header-title">System Monitor</h4>
                          <div className="d-flex">
                            <Gauge  name={["CPU usage"]} percent={systemData.cpu_load ? [systemData.cpu_load] : [0]} units="%"/>
                            <Gauge  name={["CPU temperature"]} percent={(systemData.temp && systemData.temp.coretemp)  ? [((systemData.temp.coretemp[0][1]/systemData.temp.coretemp[0][3])*100).toFixed(0)] : [0]} units="°C"/>
                            <Gauge  name={["RAM usage"]} percent={systemData.memory  ? [systemData.memory[2]] : [0]} units="%"/>
                            {diskNames.length > 0 ? <GaugeDisks name={diskNames}  percent={percents}/> : ''}
                          </div>
                    </Card.Body>
                  </Card>
                  :
                  <Card className="tilebox-one">
                      <Card.Body>
                          <h3 className="mt-0">System monitor is not available</h3>
                          <h5 className="my-3" id="active-users-count">
                            Please upgrade JR module in MytonCtrl to be able to monitor your system resources.
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
                <Card>
                    <Card.Body>
                        <h4 className="header-title">Memory usage</h4>
                        {systemData.diskSpace ?
                          <DiskUsage disk={systemData.diskSpace} memory={systemData.memory}/>
                          :
                          <Skeleton count={5}/>
                        }
                  </Card.Body>
                </Card>
              </Col>
          </Row>

        </>
    );
};



export default SystemInfo;
