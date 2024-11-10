// WhizzifyParticipantTracker.js

// This contract tracks participant interactions, such as participation and performance in quizzes
export function handle(state, action) {
    const { input, caller } = action;

    // Initial state
    if (state === null) {
        return { state: { participants: [] } };
    }

    switch (input.function) {
        case "trackParticipation":
            return trackParticipation(state, action);
        case "getParticipantScore":
            return getParticipantScore(state, action);
        default:
            throw new Error(`Function ${input.function} not supported`);
    }
}

function trackParticipation(state, action) {
    const { quizIndex, participantAddress, score } = action.input;
    const existingParticipant = state.participants.find(p => p.address === participantAddress);

    if (!existingParticipant) {
        state.participants.push({ address: participantAddress, quizzesParticipated: [] });
    }

    const participant = state.participants.find(p => p.address === participantAddress);
    participant.quizzesParticipated.push({ quizIndex, score });

    return { state };
}

function getParticipantScore(state, action) {
    const { participantAddress } = action.input;
    const participant = state.participants.find(p => p.address === participantAddress);

    if (!participant) throw new Error("Participant not found");

    const totalScore = participant.quizzesParticipated.reduce((sum, quiz) => sum + quiz.score, 0);
    return { result: totalScore };
}
