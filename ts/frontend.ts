let cloneButtons: NodeList | null = document.querySelectorAll('#ssh_project_clone, #http_project_clone');
let cloneOptionsDropdown: NodeList | null = document.querySelectorAll('.clone-options-dropdown > li > a');
let mobileCloneButtons: HTMLElement | null = document.querySelector('.mobile-git-clone .clone-dropdown-btn');
const currentPath: string = window.location.pathname;
const beforeVal: string = 'git clone ';
const copyNameBtnVal: string = 'Checkout';
const copyNameBtnClasses: string = 'gl-display-none gl-md-display-block btn gl-button btn-default gl-mr-3';
let branchNameEl: HTMLElement | null;

function modifyMobileCloneButtons() {
    (mobileCloneButtons! as HTMLInputElement).dataset.clipboardText = beforeVal + (mobileCloneButtons! as HTMLInputElement).dataset.clipboardText;
}

function createCopyBranchNameButton(branchNameEl: HTMLElement) {
    const headerActions: HTMLElement | null = document.querySelector('.detail-page-header-actions');
    const branchName: string = branchNameEl.innerHTML;
    let cloneBranchNameBtn: HTMLElement | null = document.createElement("button");
    cloneBranchNameBtn.className = copyNameBtnClasses;
    cloneBranchNameBtn.innerText = copyNameBtnVal;

    if (branchName) {
        cloneBranchNameBtn.addEventListener('click', () => {
            navigator.clipboard.writeText('git fetch && git checkout ' + branchName + ' && git pull').then(
                () => {
                    /* success - do nothing */
                },
                () => {
                    /* failure - do nothing */
                }
            );
        });
    }

    if (headerActions) {
        headerActions.prepend(cloneBranchNameBtn);
    }
}

if (currentPath.includes('merge_requests/')) {
    let checkInterval = window.setInterval(() => {
        branchNameEl = document.querySelector('.label-branch a');

        if (branchNameEl) {
            createCopyBranchNameButton(branchNameEl);
            clearInterval(checkInterval);
        }
    }, 300);
}

try {
    cloneButtons.forEach(function (item) {
        (item as HTMLInputElement).value = beforeVal + (item as HTMLInputElement).value;
    });

    cloneOptionsDropdown.forEach(item => {
        item.addEventListener('click', modifyMobileCloneButtons);
    });

    modifyMobileCloneButtons();
} catch (err) {
    // do nothing
}
