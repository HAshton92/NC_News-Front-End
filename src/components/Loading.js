import React, { Component } from "react";
import "../App.css";

class Loading extends Component {
  render() {
    return (
      <section className="section">
        <img
          src="https://images.ecosia.org/70E2vpbZFazSjy-RkarxDuj3ATI=/0x390/smart/http%3A%2F%2Fwww.pngpix.com%2Fwp-content%2Fuploads%2F2016%2F10%2FPNGPIX-COM-Yin-Yang-PNG-Transparent-Image-5.png"
          className="loadingImage"
          alt="loadingImg"
        />
        <h1>LOADING...</h1>
      </section>
    );
  }
}

export default Loading;
