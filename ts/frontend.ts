let cloneButtons: NodeList | null = document.querySelectorAll('#ssh_project_clone, #http_project_clone');
let cloneOptionsDropdown: NodeList | null = document.querySelectorAll('.clone-options-dropdown > li > a');
let mobileCloneButtons: Element | null = document.querySelector('.mobile-git-clone .clone-dropdown-btn');
const beforeVal: string = 'git clone ';

if (cloneButtons) {
    cloneButtons.forEach(function (item) {
        (item as HTMLInputElement).value = beforeVal + (item as HTMLInputElement).value;
    });
}

if (mobileCloneButtons) {
    function modifyMobileCloneButtons() {
        (mobileCloneButtons! as HTMLInputElement).dataset.clipboardText = beforeVal + (mobileCloneButtons! as HTMLInputElement).dataset.clipboardText;
    }

    modifyMobileCloneButtons();

    cloneOptionsDropdown.forEach(item => {
        item.addEventListener('click', modifyMobileCloneButtons);
    });
}