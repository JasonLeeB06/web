import $ from "jquery";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
TimeAgo.addDefaultLocale(en);

const timeAgo = new TimeAgo('en-US');

$(document).ready(() => {
    $.get("https://koyu.space/api/v1/accounts/109642905885595484/statuses?exclude_replies=true&exclude_reblogs=true", (data) => {
        $("#status-content").html(data[0].content);
        $("#status-time").html(`<a href="${data[0].url}" target="_blank">${timeAgo.format(new Date(data[0].created_at))}</a>`);
    });
});