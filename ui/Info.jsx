import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';


export default class Info1 extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
      var imageStyle = {
        backgroundImage: "/images/balloon.png",
      };
      var pStyle = {
        backgroundColor: "#FF6440",
        color: "#F0F0F0",
      };

      return (
          <div className="row">
            <div style={pStyle} className="col-md-6">
              <p>
              Lorem Elsass ipsum Coopé de Truchtersheim ornare Christkindelsmärik rucksack baeckeoffe salu id, lacus tellus eleifend wie lotto-owe mollis libero, mamsell in, munster hopla Verdammi Hans libero. kuglopf sit schnaps messti de Bischheim elementum tellus Carola dui kougelhopf Morbi Mauris hopla yeuh.
              </p>
            </div>
            <div style={imageStyle} className="col-md-6">
            </div>
          </div>
        );
      }
}

export class Info2 extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
      var imageStyle = {
        backgroundImage: "/images/landscape.png",
      };
      var pStyle = {
        backgroundColor: "#6A48D7",
        color: "#F0F0F0",
      };

      return (
          <div className="row">
            <div style={imageStyle} className="col-md-6">
            </div>
            <div style={pStyle} className="col-md-6">
              <p>
              Chulien ac gewurztraminer porta leo quam. commodo eget bissame ornare aliquam jetz gehts los so picon bière leverwurscht hoplageiss Oberschaeffolsheim adipiscing Yo dû. ullamcorper ante sit ftomi! schneck réchime geïz Spätzle vulputate Miss Dahlias sed Gal. blottkopf, pellentesque amet sit Oberschaeffolsheim und Chulia Roberstau dignissim Pfourtz ! hop Kabinetpapier hopla merci vielmols.
              </p>
            </div>
          </div>
        );
      }
}
