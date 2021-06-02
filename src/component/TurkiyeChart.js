import React from 'react';
import ApiServices from '../services/service';
import Chart from "react-apexcharts";
import '../BilgiComponent.css';

class TurkeyComponent extends ApiServices {

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        await this.getBilgi();
        let vaka;
        let taburcu;
        let vefat;
        Array.from(this.state.data)?.map(item => {
            vaka = item.toplamVaka;
            taburcu = item.toplamTaburcu;
            vefat = item.toplamVefat
        });
        let toplamTurkeyData = [];
        toplamTurkeyData.push(vaka);
        toplamTurkeyData.push(taburcu);
        toplamTurkeyData.push(vefat);

        this.setState({
            chartTurkeyData: toplamTurkeyData
        });
    }


    render() {

        return (
            <div>

                <div className="row" style={{ marginLeft: 10 }}>
                    <div className="col-lg-8">
                        <div className="mixed-chart">
                        <div style={{ display: "flex" }}>
                           <p style={{marginTop:20, color:"red"}}>TÜRKİYE GENELİ ANALİZ GRAFİĞİ</p>
                        </div>

                            <Chart
                                options={this.state.options}
                                series={[
                                    {
                                        data: this.state.chartTurkeyData == null ? [0,0,0] : this.state.chartTurkeyData
                                    }
                                ]}
                                type="bar"
                                width="600"
                            />
                        </div>
                    </div>

                </div>
            </div>

        )
    }
}

export default TurkeyComponent