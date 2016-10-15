// JavaScript source code
function iTunesSearch(searchText)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
    /*    if (this.readyState == 4 && this.status == 200) {
            // Action to be performed when the document is read;
            var responseTxt = JSON.parse(this.responseText);
            searchResult(responseTxt);
        }
    };*/
    var iTunesURL = "https://itunes.apple.com/search?term=" + encodeURIComponent(searchText) + "&media=music&limit=10";
    xhr.open("GET", iTunesURL, false);
    xhr.send();
    var responseTxt = JSON.parse(xhr.responseText);
    return searchResult(responseTxt);
}

function searchResult(responseTxt)
{
    var out = new Array();
    for(var i = 0; i < responseTxt.length; i++)
    {
        var song = {
            artistName: responseTxt[i].artistName,
            trackName: responseTxt[i].trackName,
            trackID: responseTxt[i].trackId,
            voteStatus: 0,
            artWorkURL: responseTxt[i].artworkUrl60 
        };
        out.push(song);
    }
    return out;


}


