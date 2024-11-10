// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ParticipantManager {
    struct Participant {
        address participantAddress;
        uint256 quizId;
        uint256 score;
        bool rewarded;
    }

    mapping(address => mapping(uint256 => Participant)) public participants;

    function submitAnswers(
        uint256 _quizId,
        uint256[] memory _answers
    ) public {
        // Logic to check answers and calculate the score
        // For simplicity, assume that the scoring function is handled off-chain
        uint256 score = calculateScore(_quizId, _answers);
        participants[msg.sender][_quizId] = Participant(msg.sender, _quizId, score, false);
    }

    function calculateScore(uint256 _quizId, uint256[] memory _answers) internal pure returns (uint256) {
        // Implement scoring logic
        return 0;
    }
}
