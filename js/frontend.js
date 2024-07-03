"use strict";
// @ts-ignore
chrome.storage.sync.get(['url']).then((result) => {
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
            let cloneButtons = document.querySelectorAll('[data-testid="copy-ssh-url-button"], [data-testid="copy-http-url-button"]');
            let cloneInputs = document.querySelectorAll('#copy-ssh-url-input, #copy-http-url-input');
            let cloneOptionsDropdown = document.querySelectorAll('.clone-options-dropdown > li > a');
            let mobileCloneButtons = document.querySelector('.mobile-git-clone .clone-dropdown-btn');
            let mobileDropdownValues = document.querySelectorAll('.dropdown-menu-inner-content');
            const currentPath = window.location.pathname;
            const beforeVal = 'git clone ';
            const copyNameBtnVal = 'Checkout';
            const copyNameBtnClasses = 'gl-hidden md:gl-block btn gl-button btn-default gl-mr-3';
            let branchNameEl;
            function modifyMobileView() {
                mobileCloneButtons.dataset.clipboardText = beforeVal + mobileCloneButtons.dataset.clipboardText;
                mobileDropdownValues.forEach((item) => {
                    item.innerText = beforeVal + item.innerText;
                });
            }
            function createCopyBranchNameButton(branchNameEl) {
                const headerActions = document.querySelector('.detail-page-header-actions');
                let cloneBranchNameBtn = document.createElement('button');
                cloneBranchNameBtn.className = copyNameBtnClasses;
                cloneBranchNameBtn.innerText = copyNameBtnVal;
                if (branchNameEl) {
                    cloneBranchNameBtn.addEventListener('click', () => {
                        navigator.clipboard.writeText('git fetch && git checkout ' + branchNameEl.dataset.clipboardText + ' && git pull').then(() => { }, () => { });
                    });
                }
                if (headerActions) {
                    headerActions.prepend(cloneBranchNameBtn);
                }
            }
            if (currentPath.includes('merge_requests/')) {
                let checkInterval = window.setInterval(() => {
                    branchNameEl = document.querySelector('.merge-request-details .btn-default-tertiary');
                    if (branchNameEl) {
                        createCopyBranchNameButton(branchNameEl);
                        clearInterval(checkInterval);
                    }
                }, 300);
            }
            try {
                cloneButtons.forEach((item) => {
                    const currentVal = item.dataset.clipboardText;
                    item.setAttribute('data-clipboard-text', beforeVal + currentVal);
                });
                cloneInputs.forEach((item) => {
                    item.value = beforeVal + item.value;
                });
                cloneOptionsDropdown.forEach((item) => {
                    item.addEventListener('click', modifyMobileView);
                });
                modifyMobileView();
            }
            catch (err) {
            }
        }
    });
});
