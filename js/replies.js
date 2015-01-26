
var converter = window.markdownit();

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
  if (text != null) {
    text = text.replace(regexp, rewrite);
  }
  return text;
}

function formatCommentWell(text) {
  if (text == null) {
    return null;
  }
  //text = formatComment(text, /\[ *((.*?) *)?\] *?\( *((.*?) *)?\)/, '[$2]($4)');
  text = formatComment(text, /( *)[^\[(](https?:[/a-zA-Z0-9\.\?\+=_#]*)( *)/g, '$1[$2]($2)$3');
  // text = formatComment(text, /[^[( ](https?:\/\/[^ ]*)/, '[$1]($1)');
  // text = formatComment(text, /^(https?:\/\/[^ ]*)/, '[$1]($1)');
  // text = htmlDecode(text);
  // text = formatComment(text, /(^|[^\(])(https?[\.\w:/\?\+\-\=\&\%]*)([^\)]|$)/g, ' [$2]($2) ');
  var text = converter.render(text);
  // text = formatComment(text, /~~([^~]*)~~/g, '<del>$1</del>');
  return text;
}

function htmlDecode(input){
  var e = document.createElement('div');
  e.innerHTML = input;
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}
