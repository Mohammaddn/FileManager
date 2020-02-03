
function ShowUpload() {
    $("#pphup").val($("#ph3").text().substr($("#ph3").text().lastIndexOf("/") + 1, $("#ph3").text().length - $("#ph3").text().lastIndexOf("/") + 1));
}
function RenameFolder(FolderID, FolderName, pid) {

    var filename = $('.Selectt').find("a").text();
    var input = prompt("Enter File Name:", filename);
    if (input.trim() != "") {
        if ($("#filemanager").find(".mmm a").filter(function () { return $(this).text().toLowerCase() == input.toLowerCase() }).length > 0) {
            alert("This file is available");
            return;
        }
        $.post("/FileManager/RenameFolder", { path: $("#ph").val(), originalfile: filename, NewName: input }, function (data) {
            if (data == "ok") {
                OpenFolder($("#ph").val());
            }
            else {
                alert(data);
            }

        });
    }

}
function closeAllMenu() {
    $("#ctmenu3").css('visibility', 'hidden');
    $("#ctmenu2").css('visibility', 'hidden');
    $("#ctmenu").css('visibility', 'hidden');
    $("#multis").css('visibility', 'hidden');
    $("#exf").css('display', 'none');

}
$(".mmm").contextmenu(function (data) {
    data.preventDefault();
    if ($(this).hasClass("selectt") == false) {
        if (ctrl == false) {
            $(".flcl").removeClass("Selectt");
            $(".mmm").not($(this)).removeClass("Selectt");
        }
        $(this).addClass("Selectt");
    }
    closeAllMenu();
    if ($(".Selectt").length > 1) {
        $("#multis").css('visibility', 'visible');
        $("#multis").css('top', data.clientY + 5);
        $("#multis").css('left', data.clientX + 5);
    }
    else {
        $("#ctmenu").css('visibility', 'visible');
        $("#ctmenu").css('top', data.clientY + 5);
        $("#ctmenu").css('left', data.clientX + 5);
        $("#exf").css('display', 'none');
    }

    return false;
});
$(".mmm").click(function () {
    closeAllMenu();
});
var ctrl = false;
$(document).keydown(function (event) {

    if (event.key.toLowerCase() == "control") {
        ctrl = true;
    }

});
$(document).keyup(function (event) {

    ctrl = false;

});
$("#see").mouseup(function (data) {
    if (data.button == 0) {
        closeAllMenu();
    }
});
$("#see").contextmenu(function (data) {
    data.preventDefault();
    closeAllMenu();

    $("#ctmenu2").css('visibility', 'visible');
    $("#ctmenu2").css('top', data.clientY + 5);
    $("#ctmenu2").css('left', data.clientX + 5);
    return false;
});
$(".flcl").dblclick(function () {
    window.open($(this).children("a").attr("href"), "newblank", "")


});
$(".mmm").dblclick(function () {
    OpenFolder($(this).find("a").data("path"));
});
function OpenFolder(address) {
    $("#filemanager").load("/FileManager/GetFiles?Path=" + address, function () {
        $("#ph").val(address);
        if ($("#ph").val() == "") {
            $("#ph").val("\\");
        }
    });
    return false;
}
$(".mmm").mousedown(function (data) {
    if (data.button == 0) {
        if (ctrl == false) {
            $(".flcl").removeClass("Selectt");
            $(".mmm").not($(this)).removeClass("Selectt");
        }
        
        if ($(this).hasClass("Selectt")) {
            $(this).removeClass("Selectt");
        }
        else {
            $(this).addClass("Selectt");
        }
    }
    

});
$(".mmm").mousemove(function (data) {
    $("#det").css('display', 'block');
    $("#det").css('top', data.clientY + 10);
    $("#det").css('left', data.clientX + 10);
    $("#det").text($(this).find("a").text());
});
$(".mmm").mouseout(function (data) {
    $("#det").css('display', 'none');
});
$(".flcl").mousemove(function (data) {
    $("#det").css('display', 'block');
    $("#det").css('top', data.clientY + 10);
    $("#det").css('left', data.clientX + 10);
    $("#det").text($(this).find("a").text());
});
$(".flcl").mouseout(function (data) {
    $("#det").css('display', 'none');
});
function OpenFileMenu() {
    window.open($('.Selectt').find("a").attr("href"));
}
$(".flcl").mousedown(function (data) {
    if (data.button == 0) {
        if (ctrl == false) {
            $(".flcl").removeClass("Selectt");
            $(".mmm").removeClass("Selectt");
        }
        if ($(this).hasClass("Selectt")) {
            $(this).removeClass("Selectt");
        }
        else {
            $(this).addClass("Selectt");
        }
    }

});
$(".flcl").contextmenu(function (data) {
    data.preventDefault();
    closeAllMenu();
    data.preventDefault();
    if ($(this).hasClass("selectt") == false) {
        if (ctrl == false) {
            $(".mmm").removeClass("Selectt");
            $(".flcl").not($(this)).removeClass("Selectt");
        }
        $(this).addClass("Selectt");
    }
    if ($(".selectt").length > 1) {
        $("#multis").css('visibility', 'visible');
        $("#multis").css('top', data.clientY + 5);
        $("#multis").css('left', data.clientX + 5);
    }
    else {
        $("#ctmenu3").css('visibility', 'visible');
        $("#ctmenu3").css('top', data.clientY + 5);
        $("#ctmenu3").css('left', data.clientX + 5);
    }

    var zip = false;
    try {
        if ($(this).find("a").text().substring($(this).find("a").text().lastIndexOf(".") + 1).toLowerCase() == "zip") {
            zip = true;
        }
    }
    catch
    {
        zi = false;
    }
    if (zip == true) {
        $("#exf").css("display", "block");
    }
    return false;


});
function CopyFile(t) {
    $(".Selectt").each(function () {
        past.push($(this).find("a").data("path"));
        if ($(this).hasClass("mmm")) {
            pstype.push(true);
        }
        else {
            pstype.push(false);
        }
    });
    
    ps = t;
}
function PasteFile() {
    var file = past;
    try {
        file = file.substr(file.lastIndexOf("\\") + 1);
    }
    catch{ file = past }
    if ($("#filemanager").find("a").filter(function () { return $(this).text().toLowerCase() == file.toLowerCase() }).length > 0) {
        if (confirm("This file is available\nReplace?") == false) {
            return;
        }
    }
    $.post("/FileManager/PasteFile", { OriginalPath: past, NewPath: "\\" + $("#ph").val(), type: ps, filetype: pstype }, function (data) {
        if (data == "ok") {
            past = [];
            pstype = [];
            RefreshFolder();
        }
        else {
            alert(data);
        }
    });
}
function RenameFile() {
    var filename = $('.Selectt').find("a").text();
    var input = prompt("Enter File Name:", filename);
    if (input.trim() != "") {
        if ($("#filemanager").find("a").filter(function () { return $(this).text().toLowerCase() == input.toLowerCase() }).length > 0) {
            alert("This file is available");
            return;
        }
        $.post("/FileManager/RenameFile", { path: $("#ph").val(), originalfile: filename, NewName: input }, function (data) {
            if (data == "ok") {
                RefreshFolder();
            }
            else {
                alert(data);
            }

        });
    }
}
function DeleteFile() {
    if (confirm("Are you sure?")) {
        var file = [];
        var filetype = [];


        $(".Selectt").each(function () {
            file.push($(this).find("a").data("path"));
            if ($(this).hasClass("mmm")) {
                filetype.push(true);
            }
            else {
                filetype.push(false);
            }
        });
        $.post("/FileManager/DeleteFile", { path: file, filetype: filetype }, function (data) {
            if (data == "ok") {
                RefreshFolder();
            }
            else {
                alert(data);
            }

        });
    }
}
function RefreshFolder() {
    OpenFolder($("#ph").val());
}
function ExtractZip() {
    var file = $('.Selectt').find("a").data("path");
    $.post("/FileManager/ExtractZip", { path: file }, function (data) {
        if (data == "ok") {
            RefreshFolder();
        }
        else {
            alert(data);
        }
    });
}
function ZipFile() {
    var file = [];
    var filetype = [];

    var input = prompt("Enter Zip File Name:");
    if (input.trim() == "") {
        return;
    }
    if ($("#filemanager").find("a").filter(function () { return $(this).text() == input }).length > 0) {
        alert("This file is available");
        return;
    }
    $(".Selectt").each(function () {
        file.push($(this).find("a").data("path"));
        if ($(this).hasClass("mmm")) {
            filetype.push(true);
        }
        else {
            filetype.push(false);
        }
    });
    $.post("/FileManager/Zip", { path: $("#ph").val(), name: input, files: file, filetype: filetype }, function (data) {
        if (data == "ok") {
            RefreshFolder();
        }
        else {
            alert(data);
        }

    });
}
function CreateFolder() {
    var input = prompt("Enter Folder Name:");
    if (input.trim() == "") {
        return;
    }
    if ($("#filemanager").find("a").filter(function () { return $(this).text().toLowerCase() == input.toLowerCase() }).length > 0) {
        alert("This Folder is available");
        return;
    }
    $.post("/FileManager/CreateFolder", { Path: $("#ph").val(), name: input }, function (data) {
        if (data == "ok") {
            RefreshFolder();
        }
        else {
            alert(data);
        }
    });
}