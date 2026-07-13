let pieChart = null;
let barChart = null;


function updateCharts(data = transactions) {

    drawPieChart(data);

    drawBarChart(data);

}



function drawPieChart(data = transactions) {

    const canvas = document.getElementById("pieChart");

    if (!canvas) return;


    const byCategory = {};


    data
        .filter(tx => tx.type === "expense")
        .forEach(tx => {

            byCategory[tx.category] =
                (byCategory[tx.category] || 0) + tx.amount;

        });



    if (pieChart) {

        pieChart.destroy();

    }



    pieChart = new Chart(
        canvas,
        {

            type: "pie",

            data: {

                labels: Object.keys(byCategory),

                datasets: [{

                    data: Object.values(byCategory),

                    backgroundColor: [
                        "#E8E4DC",
                        "#FFFFFF",
                        "#666666",
                        "#999999",
                        "#CCCCCC"
                    ]

                }]

            },


            options: {

                plugins: {

                    legend: {

                        labels: {

                            color: "#E8E4DC"

                        }

                    }

                }

            }

        }

    );

}




function drawBarChart(data = transactions) {

    const canvas = document.getElementById("barChart");

    if (!canvas) return;


    const byMonth = {};


    data.forEach(tx => {

        const month = tx.date.slice(0, 7);


        byMonth[month] =
            (byMonth[month] || 0) +
            (tx.type === "income"
                ? tx.amount
                : -tx.amount);

    });



    if (barChart) {

        barChart.destroy();

    }



    barChart = new Chart(
        canvas,
        {

            type: "bar",


            data: {

                labels: Object.keys(byMonth).sort(),


                datasets: [{

                    label: "Net Flow",

                    data: Object
                        .keys(byMonth)
                        .sort()
                        .map(month => byMonth[month]),


                    backgroundColor: "#E8E4DC"

                }]

            },


            options: {

                scales: {

                    x: {

                        ticks: {

                            color: "#E8E4DC"

                        }

                    },


                    y: {

                        ticks: {

                            color: "#E8E4DC"

                        }

                    }

                },


                plugins: {

                    legend: {

                        labels: {

                            color: "#E8E4DC"

                        }

                    }

                }

            }

        }

    );

}