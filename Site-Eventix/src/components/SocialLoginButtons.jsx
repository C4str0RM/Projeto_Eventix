import React from "react";

export const SocialLoginButtons = ({ onGoogle, onFacebook }) => (
  <div className="social-login">
    <button type="button" className="google-btn" onClick={onGoogle}>
      Cadastrar com Google
    </button>
    <button type="button" className="facebook-btn" onClick={onFacebook}>
      Cadastrar com Facebook
    </button>
  </div>
);
