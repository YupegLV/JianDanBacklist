$('.commentlist li').each(function (index, element) {
    let name = $(this).find('.author').children('strong').html(),
        thiss = $(this);
    chrome.storage.sync.get({
        blacklist: []
    }, function (items) {
        let list = items.blacklist;
        if (list.indexOf(name) !== -1) {
            thiss.remove();
        }
    });
});
$('.author strong').each(function (index, element) {
    console.log($(this).html());
});