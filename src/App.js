import React, { Component } from "react";
import axios from "axios";
import logo from "./images/logo.png";
import './App.css';
import './index.css';
import BilgiComponent from './component/BilgiComponent';
import TurkiyeComponent from './component/TurkiyeChart';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: {},
      text: "",
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: ["Vaka", "Taburcu", "Vefat"]
        }
      },
      series: [
        {
          name: "series-1",
          data: [20, 30, 40],
        }
      ],

    };
  }
  refresh() {
    window.location.reload();
}

  componentDidMount() {
    this.setState({
      isLoading: true
    })
    this.getBilgiByDate();
  }


  getBilgiByDate() {
    axios
      .get('http://localhost:8080/api/v1/byDate/', {

        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      })
      .then(res => this.setState({
        data: console.log(res.data)
      }))
      .catch(err => console.log(err)
      );
    this.setState({
      isLoading: false
    })
  }

  datam = {
    toplamvaka: 26,
    toplamtaburcu: 12
  }

  onTextChange = e => {
    this.setState({
      text: e.target.value
    });
  };



  handleSubmit = async e => {
    e.preventDefault();
    var data = {
      text: this.state.text,
    };
    await axios
      .post("http://localhost:8080/api/v1/haber", data)
      .then(res =>
        alert("Haber gönderilmiştir.", res))
      .catch(err => console.log(err)
      );
    this.setState({
      text: ''
    })
    this.refresh();
  };

  render() {
    return (

      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <img src={logo} alt="HAVELSAN LOGO" />
          </div>
          <div className="col-lg-6">
            <p style={{ fontWeight: "bold", marginTop: 40, fontSize: 20, color: '#164156' }}>COVID-19 VİRÜSÜNÜN GÜNLÜK HABERLERE GÖRE ANALİZİNİ YAPIN</p>
          </div>
        </div>


        <div className="row" style={{ marginTop: 30 }}>
          <div className="col-lg-4">
            <h6 style={{ marginLeft: 30, color: 'red' }}>Haber girilirken dikkat edilmesi gereken hususlar.</h6>
            <ul style={{ fontSize: 12 }}>Haberde <span>vaka, taburcu, vefat</span> anahtar kelimeleri ayrı cümlelerde bulunmalıdır.</ul>
            <ul style={{ fontSize: 12 }}>Tarih ve il bilgisi farklı veya aynı cümle içinde kullanılabilir.</ul>
            <ul style={{ fontSize: 12 }}>Bu şartlar altında öğrenmek istediğiniz haberle ilgili analizi yapmak için haber giriniz.</ul>

          </div>
          <div className="col-lg-4">
            <p style={{ fontSize: 12, color: 'red' }}> Örnek Haber</p>
            <p style={{ fontSize: 12 }}>19.04.2020 tarihinde İstanbul için korona virüs ile ilgili yeni bir açıklama yapıldı. Korona virüs salgınında yapılan testlerde 20 yeni vaka tespit edildi. taburcu sayısı ise 7 oldu.  3 kişin de vefat ettiği öğrenildi.</p>
          </div>
        </div>
        <form onSubmit={this.handleSubmit}>

          <div className="row" style={{ width: 1150, marginLeft: 30 }}>
            <input
              placeholder="Haber giriniz" value={this.state.text}
              onChange={this.onTextChange} required
            />
          </div>
          <div >
            <button className="gonder" type="submit">Haberi Analiz İçin Tıkla</button>
     
          </div>
        </form>
        <div className="row">
          <div className="col-lg-6">
          <BilgiComponent />
          </div>
          <div className="col-lg-6">
          <TurkiyeComponent />
          </div>
        </div>
        
       
      </div>

    );
  }
}


export default App;
