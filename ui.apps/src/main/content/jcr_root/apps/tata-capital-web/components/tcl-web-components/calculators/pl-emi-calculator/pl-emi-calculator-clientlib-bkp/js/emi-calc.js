$(document).ready(function(){
    highChartRender = function (tap,tip,calcName){
        /* console.log(tap,tip)*/
        var emiCalculatorChart ={
            chart: {
                type: "variablepie",
                margin: [0, 0, 0, 0],
                backgroundColor: 'transparent',
            },
            credits: {
                enabled: false,
            },
            title: {
                text: "",
            },
            tooltip: {
                enabled: false,
            },
            plotOptions: {
                variablepie: {
                    size: 200,
                    allowPointSelect: false,
                    colors: ['#2E93EB', '#D8E024'],
                    dataLabels: {
                        enabled: true,
                        format: '<span class="dataLabel-head">{point.name}</span></br> <b>{point.price}</b>',
                        style: { fontFamily: '\'OpenSans-Regular\', sans-serif', lineHeight: '22px', fontSize: '16px' }
                    }
                }
            },
            series: [{
                minPointSize: 10,
                innerSize: '0',
                zMin: 0,
                startAngle: 90,
                data: [
                    {
                        name: "Total Amount <br/> Payable",
                        price: "₹"+Math.round(tap).toLocaleString('EN-IN')+"*",
                        y: tap,
                        z: 109
                    },
                    {
                        name: "Total Interest <br/> Payable",
                        price: "₹"+Math.round(tip).toLocaleString('EN-IN')+"*",
                        y: tip,
                        z: 192
                    }
                ]
            }],

            responsive: {
                rules: [
                    {
                        condition: {
                            maxWidth: 390
                        },
                        chartOptions: {
                            plotOptions: {
                                variablepie: {
                                    size: 200,
                                    dataLabels: {
                                        enabled: false
                                    },
                                    showInLegend: true
                                }
                            },
                            legend: {
                                align: 'left',
                                verticalAlign: 'top',
                                symbolWidth: 5,
                                symbolHeight: 5,
                                layout: 'vertical',
                                y: -15,
                                x: -15,
                                labelFormatter: function () {
                                    return '<span class="dataLabel-head">' + this.name+'</span></br> <b>' + this.price + '</b>';
                                },
                                style: { fontFamily: '\'OpenSans-Regular\', sans-serif', lineHeight: '16px', fontSize: '14px' }
                            },
                        },
                    },
                    {
                        condition: {
                            maxWidth: 350
                        },
                        chartOptions: {
                            plotOptions: {
                                variablepie: {
                                    size: 180,
                                    dataLabels: {
                                        enabled: false
                                    },
                                    showInLegend: false
                                }
                            },
                            legend: {
                                align: 'left',
                                verticalAlign: 'bottom',
                                symbolWidth: 5,
                                symbolHeight: 5,
                                layout: 'vertical',
                                y: 11,
                                x: -15,
                                labelFormatter: function () {
                                    return '<span class="dataLabel-head">' + this.name+'</span></br> <b>' + this.price + '</b>';
                                },
                                style: { fontFamily: '\'OpenSans-Regular\', sans-serif', lineHeight: '16px', fontSize: '14px' }
                            },
                        },
                    }
                ]
            }
        };
       
        try{
            var emiCalculatorChart=Highcharts.chart(calcName, emiCalculatorChart)
            emiCalculatorChart.reflow();
           
        }
        catch(err){
            console.log(err)
        }
    }
});
