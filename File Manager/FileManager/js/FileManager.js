
var phh = "\\"; var fll2 = "";
$("#filemanager").load("/FileManager/GetFiles?Path=\\", function () {

});

var past = []; var pstype = [];  var ps;
    ps = 0;
function ToUp() {
    var ph = $("#ph").val();
    ph = ph.substr(0, ph.lastIndexOf("\\"));
    OpenFolder(ph);
        return false;
    }
    function ClosePanel() {
        $(".bgPanel").css('display', 'none');
        $(".UploadPanel").css('display', 'none');
        return false;
    }