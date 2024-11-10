// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract QuizManager {
    struct Quiz {
        uint256 id;
        string title;
        string[] questions;
        mapping(uint256 => string) answers;
        uint256 rewardPool;
        bool isActive;
    }

    mapping(uint256 => Quiz) public quizzes;
    uint256 public quizCount;
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
        quizCount = 0;
    }

    function createQuiz(
        string memory _title,
        string[] memory _questions,
        string[] memory _answers,
        uint256 _rewardPool
    ) public onlyOwner {
        require(_questions.length == _answers.length, "Questions and answers count mismatch");

        quizCount++;
        Quiz storage newQuiz = quizzes[quizCount];
        newQuiz.id = quizCount;
        newQuiz.title = _title;
        newQuiz.questions = _questions;
        newQuiz.rewardPool = _rewardPool;
        newQuiz.isActive = true;

        for (uint256 i = 0; i < _answers.length; i++) {
            newQuiz.answers[i] = _answers[i];
        }
    }

    function deactivateQuiz(uint256 _quizId) public onlyOwner {
        quizzes[_quizId].isActive = false;
    }
}
