// JavaScript source code
function iTunesSearch() {

    var searchText = document.getElementById("song");
    var httpReq = new XMLHttpRequest();

    /*httpReq.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Action to be performed when the document is read;
            var responseTxt = JSON.parse(this.responseText);
            searchResult(responseTxt);
        }
    };*/
    var iTunesURL = "https://itunes.apple.com/search?term=" + /*encodeURIComponent(searchText)*/ "Starboy" + "&country=CA&media=music&limit=10";
    httpReq.open("GET", iTunesURL, false);
    httpReq.setRequestHeader("Cache-Control", "no-cache");

    httpReq.send();
    var responseTxt = JSON.parse(httpReq.responseText);

    return searchResult(responseTxt);
}

function searchResult(responseTxt) {
    var out = new Array();
    for (var i = 0; i < responseTxt.length; i++) {
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