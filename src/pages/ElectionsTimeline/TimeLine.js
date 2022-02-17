// @flow
import React, {useState, useEffect} from 'react';
import Chart from 'react-apexcharts';
import Moment from 'react-moment';
import moment from 'moment';

const TimeLine = (props): React$Element<React$FragmentType> => {
    const [loading, setLoading] = useState(true);

    let apexBarChartData = {
            series: [
              {
                name: 'Elections',
                data: [

                ]
              },
            ],
            options: {
              annotations: {
                xaxis: [
                  {
                    x: new Date('23 Nov 2017').getTime(),
                    borderColor: '#775DD0',
                    label: {
                      borderColor: "#775DD0",
                      style: {
                        color: "#fff",
                        background: "#775DD0"
                      },
                      text: "Now"
                    }
                  }
                ]
              },
              chart: {
                height: 550,
                type: 'rangeBar'
              },
              plotOptions: {
                bar: {
                  horizontal: true
                }
              },
              dataLabels: {
                enabled: true,
                formatter: function(val) {
                  var a = moment(val[0])
                  var b = moment(val[1])
                  var diff = b.diff(a, 'hours')
                  return diff + (diff > 1 ? ' hours' : ' hour')
                }
              },
              fill: {
                type: 'gradient',
                gradient: {
                  shade: 'light',
                  type: 'vertical',
                  shadeIntensity: 0.25,
                  gradientToColors: undefined,
                  inverseColors: true,
                  opacityFrom: 1,
                  opacityTo: 1,
                  stops: [50, 0, 100, 100]
                }
              },
              xaxis: {
                type: 'datetime',
                labels: {
                  formatter: function (value, timestamp) {
                    return moment(new Date(value)).format("HH:mm")
                  },
                }
              },
              legend: {
                position: 'top'
              },
              tooltip: {
                x: {
                    show: true,
                    formatter: (value) => moment(new Date(value)).format("DD.MM.YYYY HH:mm"),
                },
             }
            },
          };


    const [chartData, setChartData] = useState(apexBarChartData)

    useEffect(() => {
        updateChart()
    }, [props.data]);

    const updateChart = async () => {
      let chart = chartData;
      let data =[
      {
        name: 'Elections',
        data: [
          {
            x: 'Previous',
            y: [
              (props.data.startElection-props.data.electionsStartBefore)*1000,
              (props.data.startElection-props.data.electionsEndBefore)*1000
            ]
          },
          {
            x: 'Current',
            y: [
              props.data.startElection*1000,
              props.data.endElection*1000
            ]
          },
          {
            x: 'Next',
            y: [
              props.data.startNextElection*1000,
              (props.data.startNextElection+24576)*1000
            ]
          }
        ]
      },
      {
        name: 'Validaton',
        data: [
          {
            x: 'Previous',
            y: [
              (props.data.startValidation-props.data.validatorsElectedFor)*1000,
              (props.data.startValidation)*1000
            ]
          },
          {
            x: 'Current',
            y: [
              props.data.startValidation*1000,
              (props.data.startValidation+props.data.validatorsElectedFor)*1000
            ]
          },
          {
            x: 'Next',
            y: [
              (props.data.startValidation+props.data.validatorsElectedFor)*1000,
              (props.data.startValidation+(props.data.validatorsElectedFor*2))*1000
            ]
          },
        ]
      },
      {
        name: 'Stake hold',
        data: [
          {
            x: 'Previous',
            y: [
              (props.data.startValidation)*1000,
              (props.data.startValidation+props.data.stakeHeldFor)*1000
            ]
          },
          {
            x: 'Current',
            y: [
              (props.data.startValidation+props.data.validatorsElectedFor)*1000,
              (props.data.startValidation+props.data.validatorsElectedFor+props.data.stakeHeldFor)*1000
            ]
          },
          {
            x: 'Next',
            y: [
              (props.data.startValidation+(props.data.validatorsElectedFor*2))*1000,
              (props.data.startValidation+(props.data.validatorsElectedFor*2)+props.data.stakeHeldFor)*1000
            ]
          },
        ]
      }]
      console.log(data)
      chart.series = data;
      chart.options.annotations.xaxis[0].x = props.data.validatorStatus.unixtime*1000;
      chart.options.xaxis.min = (props.data.startElection-props.data.electionsStartBefore)*1000;
      chart.options.xaxis.max = (props.data.startValidation+(props.data.validatorsElectedFor*2)+props.data.stakeHeldFor)*1000;
      props.data ? setChartData(chart): '';
      console.log(chart)
      console.log(chart)
      setLoading(false)
    }

    return (
      <>
      {chartData.series[0].data.length > 0 ?
        <Chart
            options={chartData.options}
            series={chartData.series}
            type="rangeBar"
            style={{flexBasis: 0}}
            className="apex-charts mt-3 flex-grow-1"
            height={350}
        />
      : ''}
      </>
    );

};

export default TimeLine;
