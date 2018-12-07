$('#submit').click(function (e) {
    let val = $('#input').val().trim();
    if (!val) {
        return;
    }
    chrome.storage.sync.get({
        blacklist: []
    }, function (items) {
        let list = items.blacklist;
        if (list.indexOf(val) === -1) {
            list.push(val);
            chrome.storage.sync.set({
                blacklist: list
            }, function () {});
            $('#haves').append(`<div class="have">${val}</div>`);
            removeKeyword();
        }
    });

});

init = () => {
    $('#haves').html('');
    chrome.storage.sync.get({
        blacklist: []
    }, function (items) {
        let list = items.blacklist;
        for (const iterator of list) {
            $('#haves').append(`<div class="have">${iterator}</div>`);
            removeKeyword();
        }
    });
}
init();

removeKeyword = () => {
    $('.have').unbind();
    $('.have').click(function (e) {
        let val = $(this).html();
        chrome.storage.sync.get({
            blacklist: []
        }, function (items) {
            let list = items.blacklist;
            list.remove(val)
            chrome.storage.sync.set({
                blacklist: list
            }, function () {});
        });
        $(this).remove();
    });
}
removeKeyword();

Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};