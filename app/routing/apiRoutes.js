// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsArr = require("../data/friends");



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function(req, res) {
        res.json(friendsArr);
    });

    // app.get("/api/waitlist", function (req, res) {
    //     res.json(waitListData);
    // });

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------

    app.post("/api/friends", function(req, res) {
        // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
        // It will do this by sending out the value "true" have a table
        var bestFriend, bestFriendScore = Number.MAX_VALUE;

        var myScores = req.body.scores;
        for (var i = 0; i < friendsArr.length; i++) {
            var total = 0;
            var friend = friendsArr[i];
            var friendScore = friend.scores;
            for (var j = 0; j < friendScore.length; j++) {
                var diff = Math.abs(friendScore[j] - myScores[j]);
                total += diff;

            }
            // console.log(total, friend);
            if (total < bestFriendScore) {
                bestFriendScore = total;
                bestFriend = friend;
            }

        }
        friendsArr.push(req.body);

        // console.log(bestFriend);
        res.json(bestFriend);
    });

    // ---------------------------------------------------------------------------
    // I added this below code so you could clear out the table while working with the functionality.
    // Don"t worry about it!

};
