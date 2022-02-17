// @flow
import React, {useState, useEffect} from 'react';
import Chart from 'react-apexcharts';


const DiskUsage = (props): React$Element<React$FragmentType> => {
    const [loading, setLoading] = useState(true);

    let apexBarChartData = {
            series: [{
              name: 'Used',
              data: [44]
            }, {
              name: 'Free',
              data: [53]
            }],
            options: {
              colors: ['#0088CC', '#cedee9'],
              chart: {
                type: 'bar',
                height: 350,
                stacked: true,
                stackType: '100%'
              },
              plotOptions: {
                bar: {
                  horizontal: true,
                },
              },
              stroke: {
                width: 1,
                colors: ['#fff']
              },
              title: {
                text: ''
              },
              xaxis: {
                categories: ['Disk usage', 'RAM usage'],
              },
              tooltip: {
                y: {
                  formatter: function (val) {
                    return (val/1024**3).toFixed(1) + "Gb"
                  }
                }
              },
              fill: {
                opacity: 1

              },
              legend: {
                position: 'top',
                horizontalAlign: 'left',
                offsetX: 40
              }
            },
          };


    const [chartData, setChartData] = useState(apexBarChartData)

    useEffect(() => {
        updateChart()
    }, []);

    const updateChart = async () => {
      console.log(props)
      let chart = chartData;
      let data = [{
        name: 'Used',
        data: [props.disk[1], props.memory[3]]
      }, {
        name: 'Free',
        data: [props.disk[2], props.memory[4]+props.memory[8]]
      }]
      chart.series = data;
      props.percent ? setChartData(chart): '';
      setLoading(false)
    }

    return (
        <Chart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            style={{flexBasis: 0}}
            className="apex-charts mt-3 flex-grow-1"
            height={250}
        />
    );

};

export default DiskUsage;
