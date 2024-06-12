//오늘의 혼잡도 변화 그래프
var ctx = document.getElementById('myChart1').getContext('2d');

// Firebase에서 데이터 가져오기
collectionRef.where('time', '>=', startOfDay).where('time', '<=', endOfDay).orderBy('time', 'desc').limit(10).get().then((querySnapshot) => {
    const labels = []; // 가로축에 사용할 날짜 데이터 배열
    const data = []; // 세로축에 사용할 사람 수 데이터 배열

    // 데이터 변환
    querySnapshot.forEach((doc) => {
        const 데이터 = doc.data();
        const time = 데이터.time.toDate(); // Firebase에서 날짜 데이터 가져오기
        const person_counts = 데이터.person_counts;
        const formattedTime = `${time.getHours()}시 ${time.getMinutes()}분`;
        const total = 30;
        const congestion = Math.round((person_counts / total) * 100);

        labels.unshift(formattedTime);

        // 세로축에 사람 수 데이터 추가
        data.unshift(congestion);
    });
    var myChart_1 = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels, // 가로축에 날짜 데이터 설정
            datasets: [{
                label: '혼잡도(%)',
                data: data, // 세로축에 사람 수 데이터 설정
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                // title: {
                //     display: true,
                //     //text: '오늘의 혼잡도 변화',
                //     font: {
                //         size: 30
                //     }
                // }
            },
            scales: {
                x: {
                    beginAtZero: true, // x축의 시작값을 0으로 설정
                    title: {
                        display: true,
                        text: '시간',
                        font: {
                            size: 25,
                            weight: 'bold' // 굵게 표시
                        }
                    }
                },
                y: {
                    beginAtZero: true, // y축의 시작값을 0으로 설정
                    title: {
                        display: true,
                        text: '혼잡도 (%)',
                        font: {
                            size: 25,
                            weight: 'bold' // 굵게 표시
                        }
                    }
                }
            }
        }
    });
}).catch((error) => {
    console.error('데이터 가져오기 오류:', error);
});

//mychart2
//시간대별 최대 손님 그래프 
// 시간대별 데이터 저장 배열
const hourlyData = Array.from({ length: 11 }, () => 0);

collectionRef.where('time', '>=', startOfDay).where('time', '<=', endOfDay).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        const 데이터 = doc.data();
        const time = 데이터.time;
        const hour = time.toDate().getHours(); // 시간대


        if (hourlyData[hour - 10] < 데이터.person_counts) {
            hourlyData[hour - 10] = 데이터.person_counts;
        }
    });

    drawInitialChart();
}).catch((error) => {
    console.error('데이터 가져오기 오류:', error);
});

function drawInitialChart() {
    const ctx2 = document.getElementById('myChart2').getContext('2d');
    const myChart_2 = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ['10시', '11시', '12시', '13시', '14시', '15시', '16시', '17시', '18시', '19시', '20시'],
            datasets: [{
                label: '최대 손님 수',
                data: hourlyData,
                backgroundColor: [
                    'rgba(255, 26, 104, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 26, 104, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                // title: {
                //     display: true,
                //     //text: '시간대별 최대 손님 수',
                //     font: {
                //         size: 35,

                //     }
                // }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '시간',
                        font: {
                            size: 25,
                            weight: 'bold' // 굵게 표시
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '최대 손님 수 (명)',
                        font: {
                            size: 25,
                            weight: 'bold' // 굵게 표시
                        }
                    }
                }
            }
        }
    });
}





//myChart3
collectionRef.orderBy('time', 'desc').limit(1).get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const firebase_data = doc.data();
            const person_counts = firebase_data.person_counts;

            const total = 30;
            const congestion = Math.round((person_counts / total) * 100);

            const backgroundColor = congestion >= 20 ? 'rgba(255, 0, 0, 0.2)' :
                congestion >= 10 ? 'rgba(255, 255, 0, 0.2)' : 'rgba(0, 128, 0, 0.2)';

            const borderColor = congestion >= 20 ? 'rgba(255, 0, 0, 1)' :
                congestion >= 10 ? 'rgba(255, 255, 0, 1)' : 'rgba(0, 128, 0, 1)';

            const textColor = congestion >= 20 ? 'red' :
                congestion >= 10 ? 'gold' : 'green';

            const data = {
                labels: ['혼잡도'],
                datasets: [{
                    label: 'Congestion',
                    data: [congestion, 100 - congestion],
                    backgroundColor: [
                        backgroundColor,
                        'rgba(0, 0, 0, 0.2)'
                    ],
                    borderColor: [
                        borderColor,
                        'rgba(0, 0, 0, 0.2)'
                    ],
                    borderWidth: 1,
                    cutout: '80%'
                }]
            };

            const doughnutPointer = {
                id: 'doughnutPointer',
                afterDatasetsDraw(chart, args, plugins) {
                    const { ctx, data } = chart;

                    ctx.save();

                    const xCenter = chart.getDatasetMeta(0).data[0].x
                    const yCenter = chart.getDatasetMeta(0).data[0].y
                    const innerRadius = chart.getDatasetMeta(0).data[0].innerRadius
                    const outerRadius = chart.getDatasetMeta(0).data[0].outerRadius
                    const doughnutThickness = outerRadius - innerRadius;

                    const pointerColor = plugins.pointerColor || 'black';
                    const pointerValue = plugins.pointerValue || 1;
                    const pointerRadius = plugins.pointerRadius || 0;
                    const angle = Math.PI / 180;

                    function sumArray(arr) {
                        return arr.reduce((acc, current) => acc + current, 0);
                    }

                    const dataPointArray = data.datasets[0].data.map((datapoint) => {
                        return datapoint;
                    })

                    const totalSum = sumArray(dataPointArray);
                    const targetPointerRotation = pointerValue / totalSum * 360;
                    const datapointPercentage = data.datasets[0].data[0] / totalSum * 100;

                    ctx.font = 'bold 30px sans-serif';
                    ctx.fillStyle = textColor;
                    ctx.textAlign = 'center';
                    ctx.baseline = 'middle';
                    ctx.fillText(`혼잡도 : ${datapointPercentage.toFixed(1)}%`, xCenter, yCenter + 10);

                    ctx.translate(xCenter, yCenter);
                    ctx.rotate(angle * targetPointerRotation);

                    ctx.beginPath();
                    ctx.fillStyle = pointerColor;
                    ctx.roundRect(0 - 2.5, -outerRadius - 10, 5, doughnutThickness + 20, pointerRadius);
                    ctx.fill();

                    ctx.restore();
                }
            }

            const config = {
                type: 'doughnut',
                data: data,
                options: {
                    layout: {
                        padding: 20
                    },
                    scales: {},
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: false
                        },
                        doughnutPointer: {
                            pointerValue: 20,
                            pointerColor: 'red',
                            pointerRadius: 5
                        }
                    }
                },
                plugins: [doughnutPointer]
            };

            const myChart = new Chart(
                document.getElementById('myChart3'),
                config
            );
        });
    });



