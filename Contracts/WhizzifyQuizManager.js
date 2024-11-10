// WhizzifyQuizManager.js

const SmartWeave = require('smartweave');

// Main contract for quiz management, handling quiz creation, validation, and reward distribution
export function handle(state, action) {
    const { input, caller } = action;

    // Initial state
    if (state === null) {
        return { state: { quizzes: [] } };
    }

    switch (input.function) {
        case "createQuiz":
            return createQuiz(state, action);
        case "submitAnswer":
            return submitAnswer(state, action);
        case "distributeReward":
            return distributeReward(state, action);
        default:
            throw new Error(`Function ${input.function} not supported`);
    }
}

function createQuiz(state, action) {
    const { title, questions, rewardAmount } = action.input;
    const newQuiz = {
        title,
        questions,
        rewardAmount,
        createdBy: action.caller,
        participants: []
    };

    state.quizzes.push(newQuiz);
    return { state };
}

function submitAnswer(state, action) {
    const { quizIndex, answers } = action.input;
    const quiz = state.quizzes[quizIndex];

    if (!quiz) throw new Error("Quiz not found");
    
    let score = 0;
    quiz.questions.forEach((question, index) => {
        if (question.correctAnswer === answers[index]) {
            score++;
        }
    });

    // Store the score for the participant
    quiz.participants.push({ participant: action.caller, score });
    return { state };
}

function distributeReward(state, action) {
    const { quizIndex, participantAddress } = action.input;
    const quiz = state.quizzes[quizIndex];

    if (!quiz) throw new Error("Quiz not found");

    const participant = quiz.participants.find(p => p.participant === participantAddress);
    if (!participant) throw new Error("Participant not found");

    // Reward distribution logic (simplified)
    if (participant.score > 0) {
        // Assume the rewards are paid out through a separate wallet system
        // Placeholder for actual reward distribution logic (e.g., transferring tokens)
        console.log(`Distributing ${quiz.rewardAmount} to ${participantAddress}`);
    }

    return { state };
}
