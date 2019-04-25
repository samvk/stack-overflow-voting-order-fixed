const getAnswerScore = (answerNode) => (
    parseInt(answerNode.querySelector('.js-vote-count').textContent, 10)
);

const insertAfterAnswerNode = (acceptedAnswerNode, answerNode) => {
    const acceptedAnswerSiblingAnchor = acceptedAnswerNode.previousElementSibling; // each answer node also has a previous sibling anchor it's related to

    answerNode.insertAdjacentElement('afterend', acceptedAnswerNode);
    answerNode.insertAdjacentElement('afterend', acceptedAnswerSiblingAnchor);
}

const main = () => {
    const votesViewSelected = document.querySelector('[data-shortcut="V"].is-selected');

    if (!votesViewSelected) {
        return;
    }

    const acceptedAnswerNode = document.querySelector('.accepted-answer');

    if (!acceptedAnswerNode) {
        return;
    }

    const acceptedAnswerScore = getAnswerScore(acceptedAnswerNode);

    const answerNodes = [...document.querySelectorAll('.answer:not(.accepted-answer)')].reverse(); // order by lowest score

    for (const answerNode of answerNodes) {
        const answerScore = getAnswerScore(answerNode);

        if (answerScore > acceptedAnswerScore) {
            insertAfterAnswerNode(acceptedAnswerNode, answerNode);
            break;
        }
    }
}
main();
