interface url {
    url: string;
}

const saveButton: HTMLButtonElement | null = document.querySelector('[data-save]');
const url: HTMLInputElement | null = document.querySelector('[data-url-input]');

const saveOptions = () => {
    if (url) {
        // @ts-ignore
        chrome.storage.sync.set(
            {url: url.value},
            () => {
                const status: HTMLElement | null = document.getElementById('status');

                if (status) {
                    status.textContent = 'Options saved.';
                    setTimeout(() => {
                        status.textContent = '';
                    }, 750);
                }
            }
        );
    }
};

const restoreOptions = () => {
    // @ts-ignore
    chrome.storage.sync.get(
        {url: 'gitlab.com'},
        (items: url) => {
            if (url) {
                url.value = items.url;
            }
        }
    );
};

document.addEventListener('DOMContentLoaded', restoreOptions);

if (saveButton) {
    saveButton.addEventListener('click', saveOptions)
}