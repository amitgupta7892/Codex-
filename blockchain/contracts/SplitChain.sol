// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SplitChain {
    struct Expense {
        uint id;
        string title;
        uint amount;
        address paidBy;
        address[] splitWith;
        bool settled;
    }

    uint public expenseCount = 0;
    mapping(uint => Expense) public expenses;

    event ExpenseAdded(uint id, string title, uint amount, address paidBy);
    event ExpenseSettled(uint id);

    function addExpense(string memory _title, address[] memory _splitWith) public payable {
        require(msg.value > 0, "Amount must be greater than 0");

        expenseCount++;
        expenses[expenseCount] = Expense(expenseCount, _title, msg.value, msg.sender, _splitWith, false);

        emit ExpenseAdded(expenseCount, _title, msg.value, msg.sender);
    }

    function settleExpense(uint _id) public {
        Expense storage exp = expenses[_id];
        require(!exp.settled, "Already settled");

        payable(exp.paidBy).transfer(exp.amount);
        exp.settled = true;

        emit ExpenseSettled(_id);
    }
}
