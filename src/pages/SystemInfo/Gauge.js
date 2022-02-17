// @flow
import React, {useState, useEffect} from 'react';
import Chart from 'react-apexcharts';


const Gauge = (props): React$Element<React$FragmentType> => {
    const [loading, setLoading] = useState(true);

    let apexBarChartData = {
        series: [0],
        options: {
          chart: {
            height: 150,
            type: 'radialBar',
            offsetY: -10
          },
          plotOptions: {
            radialBar: {
              startAngle: -135,
              endAngle: 135,
              dataLabels: {
                name: {
                  fontSize: '16px',
                  color: undefined,
                  offsetY: 120,

                },

                value: {
                  offsetY: 76,
                  fontSize: '22px',
                  color: undefined,
                  formatter: function (val) {

                    return val + ( props.units ? props.units : "%");
                  }
                }
              }
            }
          },
          fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                shadeIntensity: 0.15,
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 50, 65, 91]
            },
          },
          stroke: {
            dashArray: 4
          },
          labels: props.name,
        },
      };

    const [chartData, setChartData] = useState(apexBarChartData)

    useEffect(() => {
        updateChart()
    }, [props.percent]);

    const updateChart = async () => {
      let chart = chartData;
      chart.series = props.percent;
      props.percent ? setChartData(chart): '';
      setLoading(false)
    }

    return (
        <Chart
            options={chartData.options}
            series={chartData.series}
            type="radialBar"
            style={{flexBasis: 0}}
            className="apex-charts mt-3 flex-grow-1"
            height={250}
        />
    );

};

export default Gauge;
