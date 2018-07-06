var fs = require('fs');
var obj;

fs.readFile('redditpost.json', 'utf8', function(err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
    var lastIndex = 0;
    var fulltxt = obj[0]['data']['children'][0]['data']['selftext'];
    var text;
    do {
        var start = fulltxt.indexOf("table_title", lastIndex);
        
        var end = fulltxt.indexOf("**Recommended Games**", start);
        text = fulltxt.substring(start,end);
        //console.log(text);
        var date = text.match(/Week [0-9]{0,2}, Day \d, [a-zA-Z]+/gm)[0]; //extracts date
        var teams = text.match(/\*\*[A-Z0-9]{2,3}\*\*/gm); //finds teams from selected week
        if (teams.length > 10) {
            break;
        }
        console.log(date);
        let i;
        for (i = 0; i < teams.length - 1; i+=2) {
        let blue = teams[i].replace(/\*\*/g, '');
        let red = teams[i + 1].replace(/\*\*/g, '');
            console.log(blue + " VS " + red);
        }

        lastIndex = end;
    } while(start > -1)

    
});
