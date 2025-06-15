function getNearest5MinuteMark(date = new Date()) {
    let ms = 1000 * 60 * 5;
    return new Date(Math.floor(date.getTime() / ms) * ms);
}

let contestStartTime = getNearest5MinuteMark();
let scoreHistory = {}; // Do NOT clear this on refresh

function updateScoreboard() {
    fetch("https://script.google.com/macros/s/AKfycbwUYtpm7zkTLOqCZtwHy_F8n_4acG6Lc4RAbLYxCf68s3XN2ZzLImYmntKjubTi_Yq7/exec")
        .then(response => response.json())
        .then(data => {
            data.forEach(team => {
                if (!scoreHistory[team.Player]) {
                    // Always start at contest start time, score 0
                    scoreHistory[team.Player] = [
                        { time: contestStartTime, score: 0 }
                    ];
                    // If their score is already above zero, add their current score as a new point
                    if (team.Score > 0) {
                        scoreHistory[team.Player].push({
                            time: new Date(),
                            score: team.Score
                        });
                    }
                }
                let last = scoreHistory[team.Player][scoreHistory[team.Player].length - 1];
                if (!last || last.score !== team.Score) {
                    scoreHistory[team.Player].push({
                        time: new Date(),
                        score: team.Score
                    });
                }
            });
            updateGraph();
        })
        .catch(console.error);
}

function updateGraph() {
    let traces = [];
    let maxScore = 0;

    Object.keys(scoreHistory).forEach(team => {
        let teamData = scoreHistory[team];
        let teamScores = teamData.map(point => point.score);
        let teamMax = Math.max(...teamScores);
        if (teamMax > maxScore) maxScore = teamMax;

        traces.push({
            x: teamData.map(point => point.time),
            y: teamScores,
            mode: "lines+markers",
            name: team,
            line: { width: 2 },
            marker: { size: 6 }
        });
    });

    // Always fit to the highest score (plus headroom)
    let yMax = maxScore > 0 ? maxScore + 100 : 1000;

    let layout = {
        paper_bgcolor: "#fff",
        plot_bgcolor: "#fff",
        font: { family: "Open Sans, Verdana, Arial, sans-serif", color: "#333" },
        title: { text: "Top Teams", font: { size: 20 } },
        xaxis: {
            title: "",
            type: "date",
            tickformat: "%H:%M",
            gridcolor: "#eee",
            zeroline: false
        },
        yaxis: {
            title: "",
            gridcolor: "#eee",
            zeroline: false,
            range: [0, yMax]
        },
        legend: {
            orientation: "h",
            y: -0.2,
            font: { size: 12 }
        },
        margin: { t: 60, l: 60, r: 30, b: 80 }
    };

    Plotly.react("chart", traces, layout, {responsive: true});

    // Legend hover highlight
    const chartDiv = document.getElementById('chart');
    chartDiv.on('plotly_legendhover', function(eventdata) {
        let update = {opacity: Array(traces.length).fill(0.2)};
        update.opacity[eventdata.curveNumber] = 1.0;
        Plotly.restyle('chart', update);
    });
    chartDiv.on('plotly_legendunhover', function() {
        let update = {opacity: Array(traces.length).fill(1.0)};
        Plotly.restyle('chart', update);
    });
}

// Auto-refresh scoreboard & graph every 5 seconds
setInterval(updateScoreboard, 5000);
document.addEventListener("DOMContentLoaded", updateScoreboard);