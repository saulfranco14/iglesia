$(function() {
    if ($(".datepicker").datetimepicker({
            viewMode: "years",
            format: "YYYY-MM-DD HH:mm"
        }), $("header").find("a").each(function(t, i) {
            var e = $(i).attr("href");
            location.pathname == e ? $(i).addClass("active") : $(i).removeClass("active")
        }), $("body").on("change", "select", function() {
            $_this = $(this), input = $_this.siblings("input"), val = $_this.children("option:selected").text(), "-1" == val ? input.val(input.attr("placeholder")) : input.val($_this.children("option:selected").text())
        }), location.href.split("?").pop().split("&").length > 1) {
        var t = location.href.split("?").pop().split("&");
        t.pop().split("=").pop(), t.pop().split("=").pop()
    }
});

$(function() {
    if ($(".datepicker-short").datetimepicker({
            viewMode: "years",
            format: "YYYY-MM-DD"
        }), $("header").find("a").each(function(t, i) {
            var e = $(i).attr("href");
            location.pathname == e ? $(i).addClass("active") : $(i).removeClass("active")
        }), $("body").on("change", "select", function() {
            $_this = $(this), input = $_this.siblings("input"), val = $_this.children("option:selected").text(), "-1" == val ? input.val(input.attr("placeholder")) : input.val($_this.children("option:selected").text())
        }), location.href.split("?").pop().split("&").length > 1) {
        var t = location.href.split("?").pop().split("&");
        t.pop().split("=").pop(), t.pop().split("=").pop()
    }
});


$(function() {
    if ($(".datepicker-monthYear").datetimepicker({
            viewMode: "years",
            format: "MM/YYYY"
        }), $("header").find("a").each(function(t, i) {
            var e = $(i).attr("href");
            location.pathname == e ? $(i).addClass("active") : $(i).removeClass("active")
        }), $("body").on("change", "select", function() {
            $_this = $(this), input = $_this.siblings("input"), val = $_this.children("option:selected").text(), "-1" == val ? input.val(input.attr("placeholder")) : input.val($_this.children("option:selected").text())
        }), location.href.split("?").pop().split("&").length > 1) {
        var t = location.href.split("?").pop().split("&");
        t.pop().split("=").pop(), t.pop().split("=").pop()
    }
});

$(function() {
    if ($(".datepickere").datetimepicker({
            format: "DD-MM-YYYY HH:mm"
        }), $("header").find("a").each(function(t, i) {
            var e = $(i).attr("href");
            location.pathname == e ? $(i).addClass("active") : $(i).removeClass("active")
        }), $("body").on("change", "select", function() {
            $_this = $(this), input = $_this.siblings("input"), val = $_this.children("option:selected").text(), "-1" == val ? input.val(input.attr("placeholder")) : input.val($_this.children("option:selected").text())
        }), location.href.split("?").pop().split("&").length > 1) {
        var t = location.href.split("?").pop().split("&");
        t.pop().split("=").pop(), t.pop().split("=").pop()
    }
});
