// WhizzifyRewardPool.js

// This contract manages the reward pool and distribution of rewards to participants
export function handle(state, action) {
    const { input, caller } = action;

    // Initial state
    if (state === null) {
        return { state: { rewardPool: {} } };
    }

    switch (input.function) {
        case "addFunds":
            return addFunds(state, action);
        case "distributeRewards":
            return distributeRewards(state, action);
        default:
            throw new Error(`Function ${input.function} not supported`);
    }
}

function addFunds(state, action) {
    const { amount } = action.input;
    if (!state.rewardPool[caller]) {
        state.rewardPool[caller] = 0;
    }

    state.rewardPool[caller] += amount;
    return { state };
}

function distributeRewards(state, action) {
    const { participantAddress, amount } = action.input;
    if (!state.rewardPool[caller] || state.rewardPool[caller] < amount) {
        throw new Error("Insufficient funds in reward pool");
    }

    // Distribute rewards to the participant
    state.rewardPool[caller] -= amount;
    console.log(`Distributing ${amount} to ${participantAddress}`);
    return { state };
}
