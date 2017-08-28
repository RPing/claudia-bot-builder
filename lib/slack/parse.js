'use strict';

module.exports = function(messageObject) {
  if (messageObject && messageObject.type === 'event_callback')
    return {
      sender: messageObject.event.user,
      text: messageObject.event.text || '',
      originalRequest: messageObject,
      type: 'slack-slash-command',
      subtype: 'slack-events-api'
    };

  if (messageObject && messageObject.user_id)
    return {
      sender: messageObject.user_id,
      text: messageObject.text || '',
      originalRequest: messageObject,
      type: 'slack-slash-command',
      subtype: 'slack-slash-command'
    };

  if (messageObject && messageObject.user && messageObject.actions)
    return {
      sender: messageObject.user.id,
      text: '',
      originalRequest: messageObject,
      type: 'slack-slash-command',
      subtype: 'slack-message-action',
      postback: true
    };
};
