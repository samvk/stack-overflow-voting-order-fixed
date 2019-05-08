const getAnswerScore = (answerNode: Element) => {
    const answerScoreNode = answerNode.querySelector('.js-vote-count');

    return (answerScoreNode && answerScoreNode.textContent) ? parseInt(answerScoreNode.textContent, 10) : null;
};

const insertAfterAnswerNode = (acceptedAnswerNode: Element, answerNode: Element) => {
    const acceptedAnswerSiblingAnchor = acceptedAnswerNode.previousElementSibling; // each answer node also has a previous sibling anchor it's related to

    answerNode.insertAdjacentElement('afterend', acceptedAnswerNode);

    if (acceptedAnswerSiblingAnchor === null) {
        return;
    }

    answerNode.insertAdjacentElement('afterend', acceptedAnswerSiblingAnchor);
}

const main = () => {
    const votesViewSelected = document.querySelector('[data-shortcut="V"].is-selected');

    if (votesViewSelected === null) {
        return;
    }

    const acceptedAnswerNode = document.querySelector('.accepted-answer');

    if (acceptedAnswerNode === null) {
        return;
    }

    const acceptedAnswerScore = getAnswerScore(acceptedAnswerNode);

    if (acceptedAnswerScore === null) {
        return;
    }

    const answerNodes = [...document.querySelectorAll('.answer:not(.accepted-answer)')].reverse(); // order by lowest score

    for (const answerNode of answerNodes) {
        const answerScore = getAnswerScore(answerNode);

        if (answerScore === null) {
            return;
        }

        if (answerScore > acceptedAnswerScore) {
            insertAfterAnswerNode(acceptedAnswerNode, answerNode);
            break;
        }
    }
}
main();
