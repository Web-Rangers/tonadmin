import React from 'react';
import { store } from "react-notifications-component";

export default class reCAPTCHA {
    constructor(siteKey: string, action: string) {
        loadReCaptcha(siteKey);
        this.siteKey = siteKey;
        this.action = action;
    }

    async getToken(): Promise<string> {
      let token = "";
      try{
        await window.grecaptcha.execute(this.siteKey, {action: this.action})
        .then((res: string) => {
            token = res;
        })
      }catch(e){
        store.addNotification({
          title: "Google ReCaptcha is loading" ,
          message: "Wait until the captcha download is completed",
          type: "warning",
          insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: { duration: 5000 },
          dismissable: { click: true }
        });
      }
      return token;
    }
}

const loadReCaptcha = (siteKey: string) => {
    const script = document.createElement('script')
    script.src = `https://www.recaptcha.net/recaptcha/api.js?render=${siteKey}`
    document.body.appendChild(script)
}
