// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./QuizManager.sol";
import "./ParticipantManager.sol";

contract RewardDistributor {
    QuizManager quizManager;
    ParticipantManager participantManager;
    address public owner;

    constructor(address _quizManager, address _participantManager) {
        quizManager = QuizManager(_quizManager);
        participantManager = ParticipantManager(_participantManager);
        owner = msg.sender;
    }

    function distributeRewards(uint256 _quizId) public {
        require(quizManager.quizzes(_quizId).isActive == false, "Quiz is still active");

        // Iterate over participants and distribute rewards
        for (uint256 i = 0; i < participantManager.participantsCount(_quizId); i++) {
            address participantAddress = participantManager.getParticipantAddress(_quizId, i);
            if (!participantManager.isRewarded(participantAddress, _quizId)) {
                uint256 rewardAmount = calculateReward(participantAddress, _quizId);
                (bool success, ) = participantAddress.call{value: rewardAmount}("");
                require(success, "Reward transfer failed");
                participantManager.setRewarded(participantAddress, _quizId);
            }
        }
    }

    function calculateReward(address _participantAddress, uint256 _quizId) internal view returns (uint256) {
        // Implement reward calculation logic
        return 0;
    }
}
