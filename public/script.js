const socket = io();

if (document.querySelector('.scoreboard')) {
    // Display Interface
    socket.on('updateScores', (scores) => {
        document.getElementById('teamA-score').innerText = scores.teamA;
        document.getElementById('teamB-score').innerText = scores.teamB;
    });
}

if (document.querySelector('.control-panel')) {
    // Control Interface
    const teamAInput = document.getElementById('teamA');
    const teamBInput = document.getElementById('teamB');
    const updateButton = document.getElementById('update-scores');

    socket.on('updateScores', (scores) => {
        teamAInput.value = scores.teamA;
        teamBInput.value = scores.teamB;
    });

    updateButton.addEventListener('click', () => {
        const newScores = {
            teamA: parseInt(teamAInput.value, 10),
            teamB: parseInt(teamBInput.value, 10),
        };
        socket.emit('changeScore', newScores);
    });
}

function applyRoomStyles(roomId) {
    console.log("haha");
    const styles = {
        room1: { background: '#FFCCCC', color: '#800000' }, // Soft Red
        room2: { background: '#CCE5FF', color: '#003366' }, // Soft Blue
        room3: { background: '#D1E7DD', color: '#0F5132' }, // Soft Green
        room4: { background: '#FFF3CD', color: '#664D03' }, // Soft Yellow
        default: { background: '#F8F9FA', color: '#212529' }, // Neutral
    };

    const selectedStyle = styles[roomId] || styles.default;
    document.body.style.backgroundColor = selectedStyle.background;
    document.body.style.color = selectedStyle.color;
}