import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';


export default class Info1 extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
      var imageStyle = {
        margin: "0 auto",
        border: "0 auto",
        padding: "0 auto",
        width: "100%",
        height: "100%",
        background: "url(/images/newyork.png) no-repeat center center fixed",
        backgroundSize: "100% 100%"
      };
      var pStyle = {
        color: "#FF6440",
        width: "100%",
        height: "100%",
        padding: "50px",
      };

      // <p style={pStyle}>
      //   Lorem Elsass ipsum Coopé de Truchtersheim ornare Christkindelsmärik rucksack baeckeoffe salu id, lacus tellus eleifend wie lotto-owe mollis libero, mamsell in, munster hopla Verdammi Hans libero. kuglopf sit schnaps messti de Bischheim elementum tellus Carola dui kougelhopf Morbi Mauris hopla yeuh.
      // </p>

      return (
        <div style={imageStyle}>
        </div>
        );
      }
}

export class Info2 extends React.Component {
    constructor(props) {
        super(props);
    }

    //<p style={pStyle}>
    //Chulien ac gewurztraminer porta leo quam. commodo eget bissame ornare aliquam jetz gehts los so picon bière leverwurscht hoplageiss Oberschaeffolsheim adipiscing Yo dû. ullamcorper ante sit ftomi! schneck réchime geïz Spätzle vulputate Miss Dahlias sed Gal. blottkopf, pellentesque amet sit Oberschaeffolsheim und Chulia Roberstau dignissim Pfourtz ! hop Kabinetpapier hopla merci vielmols.
    //</p>

    render() {
      var imageStyle = {
        margin: "0 auto",
        border: "0 auto",
        padding: "0 auto",
        width: "100%",
        height: "100%",
        background: "url(/images/miami2.png) no-repeat center center fixed",
        backgroundSize: "100% 100%"
      };
      var pStyle = {
        backgroundColor: "#6A48D7",
        color: "#F0F0F0",
        width: "100%",
        height: "100%",
      };

      return (
        <div style={imageStyle}>
        </div>
        );
      }
}


export class Info3 extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
      return (
        <div>
        </div>
        );
    }
}
