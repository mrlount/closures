$(document).ready(function(){
    getBlockList();
});

function getBlockList()
{
    $("#blocklist").empty();
    $.ajax("blockList", {
        method: "GET"
    }).done(doBlockList);
};

function doBlockList(data)
{
    data.forEach(function(item){
        var panel = '<div class="panel panel-default"><div class="panel-heading">' + item.title + '<input type=text id="' + item.reference + '" placeholder="Enter Pin"><input class="btn btn=default" type="button" onclick="removeBlock(' + "'" + item.reference + "'" + ')" style="margin-left: 100px" value="Remove">' + '</div><div class="panel-body">' + item.description.replace(/\n/g, "<br>") + '</div><div class="panel-footer">Reference ' + item.reference + ' Blocked by user id: ' + item.creator + '</div></div>';
        var panelElement = $(panel);
        panelElement.appendTo('#blocklist');
    });
};

function removeBlock(reference)
{
    var pinElement = document.getElementById(reference);
    var data = {reference: reference, pin: pinElement.value};
    $.ajax("blockList", {
        method: "POST",
        data: data
    }).done(getBlockList).fail(
        function(){alert("Removing block failed\nCheck your pin");}
    );   
}

