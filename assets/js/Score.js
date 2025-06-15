function getNearest5MinuteMark(date = new Date()) {
    let ms = 1000 * 60 * 5;
    return new Date(Math.floor(date.getTime() / ms) * ms);
}

let contestStartTime = getNearest5MinuteMark();
// Load scoreHistory from localStorage if available
let scoreHistory = {};
const savedHistory = localStorage.getItem('scoreHistory');
if (savedHistory) {
    scoreHistory = JSON.parse(savedHistory);
}

function updateScoreboard() {
    fetch("https://script.google.com/macros/s/AKfycbwUYtpm7zkTLOqCZtwHy_F8n_4acG6Lc4RAbLYxCf68s3XN2ZzLImYmntKjubTi_Yq7/exec")
        .then(response => response.json())
        .then(data => {
            // Get the list of current teams from the sheet
            const currentTeams = new Set(data.map(team => team.Player));

            // Remove teams from scoreHistory that are no longer in the sheet
            Object.keys(scoreHistory).forEach(team => {
                if (!currentTeams.has(team)) {
                    delete scoreHistory[team];
                }
            });

            // Save updated history to localStorage
            localStorage.setItem('scoreHistory', JSON.stringify(scoreHistory));

            // Update leaderboard table
            const tableBody = document.getElementById("scoreboard-body");
            if (tableBody) {
                // Sort by score descending
                data.sort((a, b) => b.Score - a.Score);
                tableBody.innerHTML = "";
                data.forEach((team, idx) => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${idx + 1}</td>
                        <td>${team.Player}</td>
                        <td>${team.Score}</td>
                    `;
                    tableBody.appendChild(row);
                });
            }

            // Update scoreHistory with new/updated teams
            data.forEach(team => {
                if (!scoreHistory[team.Player]) {
                    // Always start at (0, 0)
                    scoreHistory[team.Player] = [
                        { minute: 0, score: 0 }
                    ];
                    // If their score is already above zero, add their current score as the next point
                    if (team.Score > 0) {
                        scoreHistory[team.Player].push({
                            minute: 1,
                            score: team.Score
                        });
                    }
                } else {
                    let last = scoreHistory[team.Player][scoreHistory[team.Player].length - 1];
                    if (last.score !== team.Score) {
                        scoreHistory[team.Player].push({
                            step: scoreHistory[team.Player].length,
                            score: team.Score
                        });
                    }
                }
            });

            // Save again after possible additions
            localStorage.setItem('scoreHistory', JSON.stringify(scoreHistory));

            updateGraph();
        })
        .catch(console.error);
}

function updateGraph() {
    let traces = [];
    let allTimeMaxScore = 0;
    let maxStep = 0;

    // First, find the maximum step among all teams
    Object.values(scoreHistory).forEach(teamData => {
        if (teamData.length > 0) {
            let lastStep = teamData[teamData.length - 1].step;
            if (lastStep > maxStep) maxStep = lastStep;
        }
    });

    Object.keys(scoreHistory).forEach(team => {
        let teamData = scoreHistory[team];
        let scores = teamData.map(point => point.score);
        let steps = teamData.map(point => point.step);
        let teamMax = Math.max(...scores);
        if (teamMax > allTimeMaxScore) allTimeMaxScore = teamMax;

        // Extend the line horizontally to the right edge
        let extendedSteps = [...steps];
        let extendedScores = [...scores];
        let lastStep = steps[steps.length - 1];
        let lastScore = scores[scores.length - 1];
        if (lastStep < maxStep) {
            extendedSteps.push(maxStep);
            extendedScores.push(lastScore);
        }

        traces.push({
            x: extendedSteps,
            y: extendedScores,
            mode: "lines+markers",
            name: team,
            line: { width: 2 },
            marker: { size: 6 }
        });
    });

    let yMax = allTimeMaxScore > 0 ? allTimeMaxScore + 100 : 1000;

    let layout = {
        paper_bgcolor: "#fff",
        plot_bgcolor: "#fff",
        font: { family: "Open Sans, Verdana, Arial, sans-serif", color: "#333" },
        title: { text: "Top Teams", font: { size: 20 } },
        xaxis: {
            title: "Score Update Step",
            type: "linear",
            gridcolor: "#eee",
            zeroline: false,
            range: [0, Math.max(10, maxStep)] // auto-expand if needed
        },
        yaxis: {
            title: "Score",
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

    Plotly.react("chart", traces, layout, {
        responsive: true,
        displayModeBar: false // <--- This hides the modebar/buttons
    });

    // Legend hover highlight (as before)
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