let cloneButtons = document.querySelectorAll('#ssh_project_clone, #http_project_clone');

if (cloneButtons) {
    cloneButtons.forEach(function(item){
        item.value = 'git clone ' + item.value;
    });
}