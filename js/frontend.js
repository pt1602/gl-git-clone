"use strict";
// @ts-ignore
chrome.storage.sync.get(['url']).then((result) => {
    console.log(result);
    let urls;
    if (result.url) {
        urls = result.url.split(',').map((item) => {
            return item.trim();
        });
    }
    else {
        urls = ['gitlab.com'];
    }
    urls.forEach((url) => {
        if (url === window.location.host) {
            let cloneButtons = document.querySelectorAll('#ssh_project_clone, #http_project_clone');
            let cloneOptionsDropdown = document.querySelectorAll('.clone-options-dropdown > li > a');
            let mobileCloneButtons = document.querySelector('.mobile-git-clone .clone-dropdown-btn');
            const currentPath = window.location.pathname;
            const beforeVal = 'git clone ';
            const copyNameBtnVal = 'Checkout';
            const copyNameBtnClasses = 'gl-display-none gl-md-display-block btn gl-button btn-default gl-mr-3';
            let branchNameEl;
            function modifyMobileCloneButtons() {
                mobileCloneButtons.dataset.clipboardText = beforeVal + mobileCloneButtons.dataset.clipboardText;
            }
            function createCopyBranchNameButton(branchNameEl) {
                const headerActions = document.querySelector('.detail-page-header-actions');
                const branchName = branchNameEl.innerHTML;
                let cloneBranchNameBtn = document.createElement("button");
                cloneBranchNameBtn.className = copyNameBtnClasses;
                cloneBranchNameBtn.innerText = copyNameBtnVal;
                if (branchName) {
                    cloneBranchNameBtn.addEventListener('click', () => {
                        navigator.clipboard.writeText('git fetch && git checkout ' + branchName + ' && git pull').then(() => {
                        }, () => {
                        });
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
                    item.value = beforeVal + item.value;
                });
                cloneOptionsDropdown.forEach(item => {
                    item.addEventListener('click', modifyMobileCloneButtons);
                });
                modifyMobileCloneButtons();
            }
            catch (err) {
            }
        }
    });
});
