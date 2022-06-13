let cloneButtons = document.querySelectorAll('#ssh_project_clone, #http_project_clone');
let cloneOptionsDropdown = document.querySelectorAll('.clone-options-dropdown > li > a');
let mobileCloneButtons = document.querySelector('.mobile-git-clone .clone-dropdown-btn');
const beforeVal = 'git clone ';

if (cloneButtons) {
    cloneButtons.forEach(function (item) {
        item.value = beforeVal  + item.value;
    });
}

if (mobileCloneButtons) {
    function modifyMobileCloneButtons() {
        mobileCloneButtons.dataset.clipboardText = beforeVal + mobileCloneButtons.dataset.clipboardText;
    }

    modifyMobileCloneButtons();

    cloneOptionsDropdown.forEach(item => {
        item.addEventListener('click', modifyMobileCloneButtons);
    });
}