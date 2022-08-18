// @flow
import React from 'react';
import Chart from 'react-apexcharts';
import { Card } from 'react-bootstrap';
import Lottie from "lottie-react";
import stonksAnimation from "../../../assets/stonks.json";

import { APICore } from '../../../helpers/api/apiCore';

const api = new APICore();

class HashrateChart extends React.Component{
  constructor(props){
    super(props);

    const colors = ['#0088CC'];

    let apexBarChartOpts = {
        grid: {
            padding: {
                left: 0,
                right: 0,
            },
        },
        noData: {
          text: 'No Data'
        },
        chart: {
            height: 550,
            type: 'area',
            parentHeightOffset: 0,
            toolbar: {
                show: true,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'straight',
            width: 2,
        },
        zoom: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        colors: colors,
        xaxis: {
            type: 'datetime',
            trim: true,
            tickAmount: 20,
            tooltip: {
                enabled: false,
            },
            axisBorder: {
                show: false,
            },
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    return val.toFixed(0) + " TONS";
                },
                offsetX: -15,
            },
        },
        fill: {
            type: 'gradient',
            gradient: {
                type: 'vertical',
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.45,
                opacityTo: 0.1,
                stops: [45, 100],
            },
        },
    };

    let apexBarChartData = [
        {
            name: 'Income',
            data: [],
        },
    ];

    this.state = {
      apexBarChartData,
      apexBarChartOpts,
      loading: true,
      wallet: props.wallet,
      labelsArray: []
    }

  }



  componentDidMount(){
    if(localStorage.getItem('validatorAddress') || this.props.wallet){
        this.updateChart('m', 1)
    }
  }

  async updateChart(period, value){
    let chartData = []
    api.get("https://tonadmin.org/api/v1/chart/validator?wallet="+this.state.wallet+"&time_period=" + period + "&time_value=" + value).then(response => {
      let data = response.data.result
      for(let item of data){
          if(item.value < 3000 && item.value > -100){
                 chartData.push({'x': new Date(item.date * 1000), 'y' : item.value})
          }
      }

      let apexBarChartData = [
          {
              name: 'Income',
              data: chartData,
          },
      ];

      this.setState({apexBarChartData, isActiveChart: period + value, loading: false})
    })

  }



  render(){
    const {show, isActiveChart, loading} = this.state;
    return (
        <Card className="card-h-100" style={{minHeight: 600}}>
            <Card.Body>
                <ul className="nav float-end d-none d-lg-flex">
                    <li className="nav-item">
                        <button className={`nav-link ${isActiveChart == 'd7' ? "active" : "text-muted"}`} onClick={() => this.updateChart('h', 168) } >
                            7d
                        </button>
                    </li>
                    <li className="nav-item">
                        <button className={`nav-link ${isActiveChart == 'm1' ? "active" : "text-muted"}`} onClick={() => this.updateChart('m', 1) } >
                            1m
                        </button>
                    </li>
                    <li className="nav-item">
                        <button className={`nav-link ${isActiveChart == 'm3' ? "active" : "text-muted"}`} onClick={() => this.updateChart('m', 3) } >
                            3m
                        </button>
                    </li>
                    <li className="nav-item">
                        <button className={`nav-link ${isActiveChart == 'y1' ? "active" : "text-muted"}`} onClick={() => this.updateChart('y', 1) } >
                            1y
                        </button>
                    </li>
                </ul>

                <h4 className="header-title mb-3">Validator earnings overview</h4>
                  {loading ?
                    <div style={{position: "absolute", left: "calc(50% - 50px)", top: "calc(50% - 50px)"}}>
                      <Lottie style={{width: 100, display: 'inline-block'}} animationData={stonksAnimation} />
                    </div>
                    :
                    <Chart
                        options={this.state.apexBarChartOpts}
                        series={this.state.apexBarChartData}
                        type="area"
                        className="apex-charts mt-3"
                        height={550}
                    />
                  }
            </Card.Body>
        </Card>
    );
  }
};

export default HashrateChart;
