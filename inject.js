var _l = Array.prototype.slice.call(document.querySelectorAll("#_roomListItems li"));
var _a = _l.map(function(l) { return l && l.getAttribute('aria-label');});
var _d = {
    "list": _a,
    "saved": localStorage["CWEXTENSION_DESKTOP_NOTIFICATIONS_LIST"] || '{"threads":[]}'
};

_d;
