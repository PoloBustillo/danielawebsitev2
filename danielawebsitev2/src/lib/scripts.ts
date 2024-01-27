// scripts.js
export const SimplybookWidgetScript = `
  var widget = new SimplybookWidget({
    "widget_type": "button",
    "url": "https:\/\/psicdaniela.simplybook.me",
    "theme": "bookingtroll",
    // ... other settings
  });
`;

export const MessengerTagScript = `
  var chatbox = document.getElementById('fb-customer-chat');
  chatbox.setAttribute("page_id", "106715554719583");
  chatbox.setAttribute("attribution", "biz_inbox");
`;

export const MessengerSDKScript = `
  window.fbAsyncInit = function() {
    FB.init({
      xfbml: true,
      version: 'v18.0'
    });
  };

  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/es_LA/sdk/xfbml.customerchat.js';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
`;
