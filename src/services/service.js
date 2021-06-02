
import axios from 'axios';
import { Component } from 'react';

class ApiServices extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chartdata:[],
            data: [],
            il:[],
            sehirData :[],
            chartTurkeyData:[],
            options: {
                chart: {
                  id: "basic-bar"
        
                },
                xaxis: {
                  categories: ["Vaka", "Taburcu", "Vefat"]
                }
              },
        }
    }

    async getBilgi() {
        console.log("geldim");
        let res = await axios
            .get('http://localhost:8080/api/v1/bilgiToplam');
        this.setState({
            data: res.data
        })
    }

    async getIller(params){
        let res = await axios
            .get(`http://localhost:8080/api/v1/bilgi`);
        this.setState({
            il: res.data
        })
    }

    async getToplamVeriIller(){
        let res = await axios
            .get(`http://localhost:8080/api/v1/toplamSehir`);
        this.setState({
            sehirData: res.data
        })
      //  console.log(this.state.sehirData);
    }
    

}

export default ApiServices;