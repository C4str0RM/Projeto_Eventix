import React from "react";

import facebookLogo from "../assets/facebook.png";
import googleLogo from "../assets/google.png";

export function SocialLoginButtons({ onGoogleClick, onFacebookClick }) {
  return (
    <div className="social-buttons">
      <button className="google-btn" onClick={onGoogleClick}>
        <img src={googleLogo} alt="Google" className="social-icon" />
        Entrar com Google
      </button>

      <button className="facebook-btn" onClick={onFacebookClick}>
        <img src={facebookLogo} alt="Facebook" className="social-icon" />
        Entrar com Facebook
      </button>
    </div>
  );
}
