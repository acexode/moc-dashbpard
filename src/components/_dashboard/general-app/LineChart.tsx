import  { FC } from 'react'
import Chart from 'react-apexcharts';

const LineChart:FC = () => {
    const chartData = {
        options: {
          chart: {
            id: 'line-chart', // Unique ID for the chart
          },
          xaxis: {
            categories: ['Q1', 'Q2', 'Q3', 'Q4'], // X-axis categories
          },
          grid: {
            show: false, // Remove the grid lines
          },
          colors: ['#546E7A',"#008FFB","#00E396"],
          legend: {
            tooltipHoverFormatter: function(val: string, opts: { w: { globals: { series: { [x: string]: { [x: string]: string; }; }; }; }; seriesIndex: string | number; dataPointIndex: string | number; }) {
              return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
            }
          }
        },
        series: [
          {
            name: 'Expense across quarter', // Name of the series
            data: [20, 44, 65, 80, 65], 
            
            // Data points for the area chart
          },
          {
            name: 'Revenue across quarter', // Name of the series
            data: [30, 40, 25, 50, 35], 
            
            // Data points for the area chart
          },
        
        ],
      };
  return (
       <Chart options={chartData.options} series={chartData.series} type="line"   />
  
  )
}

export default LineChart