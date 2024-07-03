// @ts-ignore
chrome.storage.sync.get(['url']).then((result) => {
    let urls: Array<string>

    if (result.url) {
        urls = result.url.split(',').map((item: string) => {
            return item.trim()
        })
    } else {
        urls = ['gitlab.com']
    }

    urls.forEach((url: string) => {
        if (url === window.location.host) {
            let cloneButtons: NodeList | null = document.querySelectorAll(
                '[data-testid="copy-ssh-url-button"], [data-testid="copy-http-url-button"]'
            )
            let cloneInputs: NodeList | null = document.querySelectorAll('#copy-ssh-url-input, #copy-http-url-input')
            let cloneOptionsDropdown: NodeList | null = document.querySelectorAll('.clone-options-dropdown > li > a')
            let mobileCloneButtons: HTMLElement | null = document.querySelector('.mobile-git-clone .clone-dropdown-btn')
            let mobileDropdownValues: NodeListOf<HTMLSpanElement> = document.querySelectorAll('.dropdown-menu-inner-content')
            const currentPath: string = window.location.pathname
            const beforeVal: string = 'git clone '
            const copyNameBtnVal: string = 'Checkout'
            const copyNameBtnClasses: string = 'gl-hidden md:gl-block btn gl-button btn-default gl-mr-3'
            let branchNameEl: HTMLElement | null

            function modifyMobileView() {
                ;(mobileCloneButtons! as HTMLInputElement).dataset.clipboardText =
                    beforeVal + (mobileCloneButtons! as HTMLInputElement).dataset.clipboardText

                mobileDropdownValues.forEach((item) => {
                    item.innerText = beforeVal + item.innerText
                })
            }

            function createCopyBranchNameButton(branchNameEl: HTMLElement) {
                const headerActions: HTMLElement | null = document.querySelector('.detail-page-header-actions')
                let cloneBranchNameBtn: HTMLElement | null = document.createElement('button')
                cloneBranchNameBtn.className = copyNameBtnClasses
                cloneBranchNameBtn.innerText = copyNameBtnVal

                if (branchNameEl) {
                    cloneBranchNameBtn.addEventListener('click', () => {
                        navigator.clipboard
                            .writeText('git fetch && git checkout ' + branchNameEl.dataset.clipboardText + ' && git pull')
                            .then(
                                () => {},
                                () => {}
                            )
                    })
                }

                if (headerActions) {
                    headerActions.prepend(cloneBranchNameBtn)
                }
            }

            if (currentPath.includes('merge_requests/')) {
                let checkInterval = window.setInterval(() => {
                    branchNameEl = document.querySelector('.merge-request-details .btn-default-tertiary')

                    if (branchNameEl) {
                        createCopyBranchNameButton(branchNameEl)
                        clearInterval(checkInterval)
                    }
                }, 300)
            }

            try {
                cloneButtons.forEach((item) => {
                    const currentVal = (item as HTMLButtonElement).dataset.clipboardText
                    ;(item as HTMLButtonElement).setAttribute('data-clipboard-text', beforeVal + currentVal)
                })

                cloneInputs.forEach((item) => {
                    ;(item as HTMLInputElement).value = beforeVal + (item as HTMLInputElement).value
                })

                cloneOptionsDropdown.forEach((item) => {
                    item.addEventListener('click', modifyMobileView)
                })

                modifyMobileView()
            } catch (err) {}
        }
    })
})
