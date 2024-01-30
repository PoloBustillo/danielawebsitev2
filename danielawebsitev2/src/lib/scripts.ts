// scripts.js
export const SimplybookWidgetScript = `
var widget = new SimplybookWidget({"widget_type":"button","url":"https:\/\/psicdaniela.simplybook.me","theme":"bookingtroll","theme_settings":{"timeline_hide_unavailable":"0","timeline_show_end_time":"0","timeline_modern_display":"as_slots","sb_base_color":"#0a3d65","display_item_mode":"list","sb_review_image":"6","sb_review_image_preview":"\/uploads\/psicdaniela\/image_files\/preview\/801453c79c2bc1a14c066ad82b046c55.png","dark_font_color":"#262020","light_font_color":"#ecf0f9","btn_color_1":"#26DD9C","sb_company_label_color":"#ffffff","hide_img_mode":"0","sb_busy":"#f57070","sb_available":"#f7faff"},"timeline":"modern","datepicker":"top_calendar","is_rtl":false,"app_config":{"allow_switch_to_ada":0,"predefined":[]},"button_title":"Haz tu cita ","button_background_color":"rgb(214 41 123)","button_text_color":"#f5f5f5","button_position":"right","button_position_offset":"55%"});
`;

export const MessengerTagScript = `
  var chatbox = document.getElementById('fb-customer-chat');
  chatbox.setAttribute("page_id", "106715554719583");
  chatbox.setAttribute("attribution", "biz_inbox");
`;

export const MessengerSDKScript = `
  window.fbAsyncInit = function() {
    FB.init({
      xfbml            : true,
      version          : 'v19.0'
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
