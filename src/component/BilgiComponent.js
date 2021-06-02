import React from 'react';
import ApiServices from '../services/service';
import Chart from "react-apexcharts";
import '../BilgiComponent.css';

class BilgiComponent extends ApiServices {

    constructor(props) {
        super(props);
        this.getSehirVerileri = this.getSehirVerileri.bind(this);
    }

    async componentDidMount() {
        await this.getBilgi();
        await this.getIller();
        let vaka;
        let taburcu;
        let vefat;
        Array.from(this.state.data)?.map(item => {
            vaka = item.toplamVaka;
            taburcu = item.toplamTaburcu;
            vefat = item.toplamVefat
        });
        let toplamData = [];
        toplamData.push(vaka);
        toplamData.push(taburcu);
        toplamData.push(vefat);

        this.setState({
            chartdata: toplamData
        });
    }


    async getSehirVerileri(il) {
        console.log(il);
        await this.getToplamVeriIller();
        let vaka;
        let taburcu;
        let vefat;

        Array.from(this.state.sehirData)?.map(item => {
            if (item._id.toLowerCase() === il.toLowerCase()) {
                vaka = item.toplamVaka;
                taburcu = item.toplamTaburcu;
                vefat = item.toplamVefat
            }
        });
        let toplamData = [];
        toplamData.push(vaka);
        toplamData.push(taburcu);
        toplamData.push(vefat);
        console.log(toplamData);
        this.setState({
            chartdata: toplamData
        });
    }

    render() {

        return (
            <div>

              
                    <div className="mixed-chart">
                        <div style={{ display: "flex" }}>
                            {
                                this.state.il?.map(item => {
                                    return <button className="sehir" key={item.il} onClick={() => this.getSehirVerileri(item.il)} style={{ marginRight: 10, marginLeft: 10 }}>{item.il}</button>

                                })
                            }
                        </div>
                        <Chart
                            options={this.state.options}
                            series={[
                                {
                                    data: this.state.chartdata ==null ? [0,0,0] : this.state.chartdata
                                }
                            ]}
                            type="bar"
                            width="600"
                        />
               
             
                </div>
            </div>

        )
    }
}

export default BilgiComponent