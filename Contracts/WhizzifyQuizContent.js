// WhizzifyQuizContent.js

// This contract will store quiz content on-chain, such as questions and answers
export function handle(state, action) {
    const { input, caller } = action;

    // Initial state
    if (state === null) {
        return { state: { quizzesContent: [] } };
    }

    switch (input.function) {
        case "storeQuizContent":
            return storeQuizContent(state, action);
        case "getQuizContent":
            return getQuizContent(state, action);
        default:
            throw new Error(`Function ${input.function} not supported`);
    }
}

function storeQuizContent(state, action) {
    const { quizTitle, questions } = action.input;
    const newContent = {
        quizTitle,
        questions
    };

    state.quizzesContent.push(newContent);
    return { state };
}

function getQuizContent(state, action) {
    const { quizTitle } = action.input;
    const quiz = state.quizzesContent.find(q => q.quizTitle === quizTitle);

    if (!quiz) throw new Error("Quiz not found");
    return { result: quiz };
}
