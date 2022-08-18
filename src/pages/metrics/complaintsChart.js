// @flow
import React from 'react';
import Chart from 'react-apexcharts';
import { Card } from 'react-bootstrap';
import Lottie from "lottie-react";
import stonksAnimation from "../../assets/stonks.json";

import { APICore } from '../../helpers/api/apiCore';

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
                    return val.toLocaleString('en-US', {minimumFractionDigits: 2}) + " TONS";
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
    if( this.props.wallet){
        this.updateChart(120)
    }
  }

  async updateChart(count){
    let chartData = []

    api.get(`https://elections.toncenter.com/getComplaints?${this.props.wallet.length == 64 ? 'adnl_address' : 'wallet_address'}=${this.props.wallet}&return_participants=false&offset=0&limit=${count}`).then(response => {
      let data = response.data
      for(let item of data){
          if(item.is_passed){
              chartData.push({'x': item.created_time*1000, 'y' : item.paid/10**9})
          }

      }


      let apexBarChartData = [
          {
              name: 'Paid: ',
              data: chartData,
          },
      ];

      this.setState({apexBarChartData, isActiveChart: count, loading: false})
    })

  }



  render(){
    const {show, isActiveChart, loading} = this.state;
    return (
        <Card className="card-h-100" style={{minHeight: 600}}>
            <Card.Body>
                <ul className="nav float-end d-none d-lg-flex">
                    <li className="nav-item">
                        <button className={`nav-link ${isActiveChart == 10 ? "active" : "text-muted"}`} onClick={() => this.updateChart(10) } >
                            7d
                        </button>
                    </li>
                    <li className="nav-item">
                        <button className={`nav-link ${isActiveChart == 40 ? "active" : "text-muted"}`} onClick={() => this.updateChart(40) } >
                            1m
                        </button>
                    </li>
                    <li className="nav-item">
                        <button className={`nav-link ${isActiveChart == 120 ? "active" : "text-muted"}`} onClick={() => this.updateChart(120) } >
                            3m
                        </button>
                    </li>
                    <li className="nav-item">
                        <button className={`nav-link ${isActiveChart == 486 ? "active" : "text-muted"}`} onClick={() => this.updateChart(486) } >
                            1y
                        </button>
                    </li>
                </ul>

                <h4 className="header-title mb-3">Validator complaints</h4>
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
