$(document).ready(function() {
    $(".searchiTunes").onclick(function() {
        itunesApiSearch.search('rock', {
            entity: 'music',
            limit: 10, // max 200 
            country: 'CA'
        }, function(err, res) {
            if (err) {
                console.log(err);
                return;
            }

            console.log(res);
        });
    });
});


// itunesApiSearch.search(term, options, callback)