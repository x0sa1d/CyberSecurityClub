function getNearest5MinuteMark(date = new Date()) {
    const ms = 1000 * 60 * 5;
    return new Date(Math.floor(date.getTime() / ms) * ms);
}

// Contest start time set to nearest 5-minute mark
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
            // Remove teams not in the latest data
            const currentTeams = new Set(data.map(team => team.Player));
            Object.keys(scoreHistory).forEach(team => {
                if (!currentTeams.has(team)) {
                    delete scoreHistory[team];
                }
            });

            // Update scoreHistory with new/updated teams
            data.forEach(team => {
                if (!scoreHistory[team.Player]) {
                    // Always start at (0, 0)
                    scoreHistory[team.Player] = [
                        { step: 0, score: 0 }
                    ];
                    // If their score is already above zero, add their current score as the next point
                    if (team.Score > 0) {
                        scoreHistory[team.Player].push({
                            step: 1,
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

            updateGraph();
        })
        .catch(console.error);
}

function updateGraph() {
    let traces = [];
    let allTimeMaxScore = 0;
    let maxStep = 0;

    // Find the maximum step among all teams
    Object.values(scoreHistory).forEach(teamData => {
        if (teamData.length > 0) {
            let lastStep = teamData[teamData.length - 1].step;
            if (lastStep > maxStep) maxStep = lastStep;
        }
    });

    Object.keys(scoreHistory).forEach(team => {
        let teamData = scoreHistory[team];
        // Only show teams with latest score >= 50
        let latestScore = teamData[teamData.length - 1].score;
        if (latestScore < 50) return;

        let scores = teamData.map(point => point.score);
        let steps = teamData.map(point => point.step);
        let teamMax = Math.max(...scores);
        if (teamMax > allTimeMaxScore) allTimeMaxScore = teamMax;

        // Build step plot data (horizontal-vertical)
        let stepX = [], stepY = [];
        for (let i = 0; i < steps.length; i++) {
            if (i > 0) {
                // Horizontal line from previous step to current step at previous score
                stepX.push(steps[i]);
                stepY.push(scores[i - 1]);
            }
            // Vertical jump to new score
            stepX.push(steps[i]);
            stepY.push(scores[i]);
        }
        // Extend horizontally to the right edge at last score
        if (steps.length > 0 && steps[steps.length - 1] < maxStep) {
            stepX.push(maxStep);
            stepY.push(scores[scores.length - 1]);
        }

        traces.push({
            x: stepX,
            y: stepY,
            mode: "lines",
            name: team,
            line: { width: 2, shape: "hv" }
        });
        // Add marker at each score change
        traces.push({
            x: steps,
            y: scores,
            mode: "markers",
            name: team + " points",
            marker: { size: 8 },
            showlegend: false
        });
    });

    let yMax = allTimeMaxScore > 0 ? allTimeMaxScore + 100 : 1000;

    let layout = {
        paper_bgcolor: "#fff",
        plot_bgcolor: "#fff",
        font: { family: "Poppins, Verdana, Arial, sans-serif", color: "#000000" },
        title: { text: "Top Teams", font: { size: 20, color: "#000000" } },
        xaxis: {
            title: "Score Update Step",
            type: "linear",
            gridcolor: "#eee",
            zeroline: false,
            range: [0, Math.max(10, maxStep)]
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
            font: { size: 12, color: "#000000" }
        },
        margin: { t: 60, l: 60, r: 30, b: 80 }
    };

    Plotly.react("chart", traces, layout, {
        responsive: true,
        displayModeBar: false
    });

    // Legend hover highlight
    const chartDiv = document.getElementById('chart');
    if (chartDiv) {
        chartDiv.on('plotly_legendhover', function(eventdata) {
            let update = {opacity: Array(traces.length).fill(0.2)};
            // Highlight both line and markers for the team
            update.opacity[eventdata.curveNumber] = 1.0;
            if (eventdata.curveNumber % 2 === 0) update.opacity[eventdata.curveNumber + 1] = 1.0;
            else update.opacity[eventdata.curveNumber - 1] = 1.0;
            Plotly.restyle('chart', update);
        });
        chartDiv.on('plotly_legendunhover', function() {
            let update = {opacity: Array(traces.length).fill(1.0)};
            Plotly.restyle('chart', update);
        });
    }
}

// Script loaded successfully
document.addEventListener("DOMContentLoaded", () => {
    // Initialize scoring functionality if needed
});

// Auto-refresh scoreboard & graph every 5 seconds
setInterval(updateScoreboard, 5000);
document.addEventListener("DOMContentLoaded", updateScoreboard);