import React from 'react'
import ReactEcharts from 'echarts-for-react'

const DoughnutChart = ({ height, color = [], data = [] }) => {

    const option = {
        legend: {
            show: true,
            itemGap: 20,
            icon: 'circle',
            bottom: 0,
            textStyle: {
                fontSize: 14,
                fontFamily: 'roboto',
            },
        },
        tooltip: {
            show: false,
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        xAxis: [
            {
                axisLine: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
            },
        ],
        yAxis: [
            {
                axisLine: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
            },
        ],

        series: [
            {
                name: 'Traffic Rate',
                type: 'pie',
                radius: ['45%', '72.55%'],
                // center: ['50%', '50%'],
                avoidLabelOverlap: false,
                hoverOffset: 5,
                stillShowZeroSum: false,
                labelLine: {
                    show: false,
                },
                data: data,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            },
        ],
    }

    return (
            <ReactEcharts
            style={{ height: height }}
            option={{
                ...option,
                color: [...color],
            }}
        />
        )
}

export default DoughnutChart