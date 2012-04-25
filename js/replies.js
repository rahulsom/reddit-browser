
var converter = new Showdown.converter();

/*
 * Adds replies to a comment
 */
function addReplies(id, replies) {
  if (replies && replies.data && replies.data.children) {
    $.each(replies.data.children, function(replyId) {
      var reply = replies.data.children[replyId];
      reply.data.body = formatCommentWell(reply.data.body);
      if (document.getElementById(reply.data.id) == null) {
        $('#' + id+' > .replies').append(ich.comment(reply.data));
        if (reply.data.replies) {
          addReplies(reply.data.id, reply.data.replies);
        }
      }
    });
  }
}

function formatComment(text, regexp, rewrite) {
  var oldText = text;
  if (text != null) {
    text = text.replace(regexp, rewrite);
  }
  return text;
}

function formatCommentWell(text) {
  if (text == null) {
    return null;
  }
  text = htmlDecode(text);
  text = formatComment(text, /(^|[^\(])(https?[\.\w:/\?\+\-\=\&\%]*)([^\)]|$)/g, ' [$2]($2) ');
  var text = converter.makeHtml(text);
  text = formatComment(text, /~~([^~]*)~~/g, '<del>$1</del>');
  return text;
}

function htmlDecode(input){
  var e = document.createElement('div');
  e.innerHTML = input;
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}      
