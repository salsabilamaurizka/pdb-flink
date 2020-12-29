import React, { Component } from "react";
import { Container, Nav } from "./styled-components";

// fusioncharts
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import Maps from "fusioncharts/fusioncharts.maps";
import BrazilRegion from "fusionmaps/maps/es/fusioncharts.brazil";
import ReactFC from "react-fusioncharts";
import "./charts-theme";

// import config from "./config";
import Dropdown from "react-dropdown";
// import formatNum from "./format-number";

import axios from "axios";

import UserImg from "../assets/images/user-img-placeholder.jpeg";

ReactFC.fcRoot(FusionCharts, Charts, Maps, BrazilRegion);

// const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;
const BRAZIL_MAP_ID = {
    AC: "001",
    AL: "002",
    AP: "003",
    AM: "004",
    BA: "005",
    CE: "006",
    DF: "007",
    ES: "008",
    GO: "009",
    MA: "010",
    MT: "011",
    MS: "012",
    MG: "013",
    PA: "014",
    PB: "015",
    PR: "016",
    PE: "017",
    PI: "018",
    RJ: "019",
    RN: "020",
    RS: "021",
    RO: "022",
    RR: "023",
    SC: "024",
    SP: "025",
    SE: "026",
    TO: "027",
};

class App extends Component {
    constructor() {
        super();
        this.state = {
            // items: [],
            // dropdownOptions: [],
            // selectedValue: null,
            // amRevenue: null,
            // ebRevenue: null,
            // etRevenue: null,
            // totalRevenue: null,
            // productViews: null,
            // purchaseRate: " ",
            // checkoutRate: " ",
            // abandonedRate: " ",
            ordersTrendStore: [],
            ordersTrendRegion: [],
            total_revenue: null,
            total_customer: null,
            total_order: null,
            top_products: [{ nama: "", jumlah_terjual: null }],
            top_customers: [{ nama: "", total_beli: null }],
        };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        await axios
            .get(`https://pdb-flink.herokuapp.com/Dashboard/`)
            .then((res) => {
                const data = res.data;
                this.setState({
                    total_revenue: data.total_revenue,
                    total_customer: data.total_customer,
                    total_order: data.total_order,
                    top_products: JSON.parse(
                        data.top_products.replaceAll("'", '"')
                    ),
                    top_customers: JSON.parse(
                        data.top_customers.replaceAll("'", '"')
                    ),
                });
                const trend_seller = [];
                const trend_region = [];
                const data_trend_seller = JSON.parse(
                    data.trend_seller.replaceAll("'", '"')
                );
                const data_trend_region = JSON.parse(
                    data.trend_region.replaceAll("'", '"')
                );
                for (let i = 0; i < 5; i++) {
                    trend_seller.push({
                        label: data_trend_seller[i].nama,
                        value: data_trend_seller[i].total_order,
                        displayValue: `${data_trend_seller[i].total_order} orders`,
                    });
                }
                this.setState({ ordersTrendStore: trend_seller });
                for (let i = 0; i < 27; i++) {
                    console.log(data_trend_region[i]);
                    trend_region.push({
                        id:
                            BRAZIL_MAP_ID[
                                data_trend_region[i].city_name.toUpperCase()
                            ],
                        value: data_trend_region[i].total_order,
                        displayValue: `${data_trend_region[
                            i
                        ].city_name.toUpperCase()}`,
                    });
                }
                this.setState({ ordersTrendRegion: trend_region });
                console.log(trend_region);
            });
    };

    // getData = (arg) => {
    //     // google sheets data
    //     const arr = this.state.items;
    //     const arrLen = arr.length;

    //     // kpi's
    //     // amazon revenue
    //     let amRevenue = 0;
    //     //ebay revenue
    //     let ebRevenue = 0;
    //     // etsy revenue
    //     let etRevenue = 0;
    //     // total revenue
    //     let totalRevenue = 0;
    //     // product views
    //     let productViews = 0;
    //     // purchase rate
    //     let purchaseRate = 0;
    //     // checkout rate
    //     let checkoutRate = 0;
    //     // abandoned rate
    //     let abandonedRate = 0;
    //     // order trend by brand
    //     let ordersTrendStore = [];
    //     // order trend by region
    //     let ordersTrendRegion = [];
    //     let orderesTrendrr = 0;
    //     let orderesTrendap = 0;
    //     let orderesTrendam = 0;
    //     let orderesTrendpa = 0;
    //     let orderesTrendac = 0;
    //     let orderesTrendro = 0;
    //     let orderesTrendmt = 0;
    //     let orderesTrendto = 0;
    //     let orderesTrendma = 0;
    //     let orderesTrendpi = 0;
    //     let orderesTrendce = 0;
    //     let orderesTrendrn = 0;
    //     let orderesTrendpb = 0;
    //     let orderesTrendpe = 0;
    //     let orderesTrendal = 0;
    //     let orderesTrendse = 0;
    //     let orderesTrendba = 0;
    //     let orderesTrendgo = 0;
    //     let orderesTrenddf = 0;
    //     let orderesTrendmg = 0;
    //     let orderesTrendms = 0;
    //     let orderesTrendes = 0;
    //     let orderesTrendrj = 0;
    //     let orderesTrendsp = 0;
    //     let orderesTrendpr = 0;
    //     let orderesTrendsc = 0;
    //     let orderesTrendrs = 0;

    //     let selectedValue = null;

    //     for (let i = 0; i < arrLen; i++) {
    //         if (arg === arr[i]["month"]) {
    //             if (arr[i]["source"] === "AM") {
    //                 amRevenue += parseInt(arr[i].revenue);
    //                 ordersTrendStore.push({
    //                     label: "Amazon",
    //                     value: arr[i].orders,
    //                     displayValue: `${arr[i].orders} orders`,
    //                 });
    //             } else if (arr[i]["source"] === "EB") {
    //                 ebRevenue += parseInt(arr[i].revenue);
    //                 ordersTrendStore.push({
    //                     label: "Ebay",
    //                     value: arr[i].orders,
    //                     displayValue: `${arr[i].orders} orders`,
    //                 });
    //             } else if (arr[i]["source"] === "ET") {
    //                 etRevenue += parseInt(arr[i].revenue);
    //                 ordersTrendStore.push({
    //                     label: "Etsy",
    //                     value: arr[i].orders,
    //                     displayValue: `${arr[i].orders} orders`,
    //                 });
    //             }
    //             productViews += parseInt(arr[i].product_views);
    //             purchaseRate += parseInt(arr[i].purchase_rate / 3);
    //             checkoutRate += parseInt(arr[i].checkout_rate / 3);
    //             abandonedRate += parseInt(arr[i].abandoned_rate / 3);
    //             orderesTrendrr += parseInt(arr[i].orders_rr);
    //             orderesTrendap += parseInt(arr[i].orders_ap);
    //             orderesTrendam += parseInt(arr[i].orders_am);
    //             orderesTrendpa += parseInt(arr[i].orders_pa);
    //             orderesTrendac += parseInt(arr[i].orders_ac);
    //             orderesTrendro += parseInt(arr[i].orders_ro);
    //             orderesTrendmt += parseInt(arr[i].orders_mt);
    //             orderesTrendto += parseInt(arr[i].orders_to);
    //             orderesTrendma += parseInt(arr[i].orders_ma);
    //             orderesTrendpi += parseInt(arr[i].orders_pi);
    //             orderesTrendce += parseInt(arr[i].orders_ce);
    //             orderesTrendrn += parseInt(arr[i].orders_rn);
    //             orderesTrendpb += parseInt(arr[i].orders_pb);
    //             orderesTrendpe += parseInt(arr[i].orders_pe);
    //             orderesTrendal += parseInt(arr[i].orders_al);
    //             orderesTrendse += parseInt(arr[i].orders_se);
    //             orderesTrendba += parseInt(arr[i].orders_ba);
    //             orderesTrendgo += parseInt(arr[i].orders_go);
    //             orderesTrenddf += parseInt(arr[i].orders_df);
    //             orderesTrendmg += parseInt(arr[i].orders_mg);
    //             orderesTrendms += parseInt(arr[i].orders_ms);
    //             orderesTrendes += parseInt(arr[i].orders_es);
    //             orderesTrendrj += parseInt(arr[i].orders_rj);
    //             orderesTrendsp += parseInt(arr[i].orders_sp);
    //             orderesTrendpr += parseInt(arr[i].orders_pr);
    //             orderesTrendsc += parseInt(arr[i].orders_sc);
    //             orderesTrendrs += parseInt(arr[i].orders_rs);
    //         }
    //     }

    //     totalRevenue = amRevenue + ebRevenue + etRevenue;
    //     ordersTrendRegion.push(
    //         {
    //             id: "01",
    //             shortLabel: "AC",
    //             value: orderesTrendac,
    //         },
    //         {
    //             id: "02",
    //             shortLabel: "AL",
    //             value: orderesTrendal,
    //         },
    //         {
    //             id: "03",
    //             shortLabel: "AP",
    //             value: orderesTrendap,
    //         },
    //         {
    //             id: "04",
    //             shortLabel: "AM",
    //             value: orderesTrendam,
    //         },
    //         {
    //             id: "05",
    //             value: orderesTrendba,
    //         },
    //         {
    //             id: "06",
    //             value: orderesTrendce,
    //         },
    //         {
    //             id: "07",
    //             value: orderesTrenddf,
    //         },
    //         {
    //             id: "08",
    //             value: orderesTrendes,
    //         },
    //         {
    //             id: "09",
    //             value: orderesTrendgo,
    //         },
    //         {
    //             id: "10",
    //             value: orderesTrendma,
    //         },
    //         {
    //             id: "11",
    //             value: orderesTrendmt,
    //         },
    //         {
    //             id: "12",
    //             value: orderesTrendms,
    //         },
    //         {
    //             id: "13",
    //             value: orderesTrendmg,
    //         },
    //         {
    //             id: "14",
    //             value: orderesTrendpa,
    //         },
    //         {
    //             id: "15",
    //             value: orderesTrendpb,
    //         },
    //         {
    //             id: "16",
    //             value: orderesTrendpr,
    //         },
    //         {
    //             id: "17",
    //             value: orderesTrendpe,
    //         },
    //         {
    //             id: "18",
    //             value: orderesTrendpi,
    //         },
    //         {
    //             id: "19",
    //             value: orderesTrendrj,
    //         },
    //         {
    //             id: "20",
    //             value: orderesTrendrn,
    //         },
    //         {
    //             id: "21",
    //             value: orderesTrendrs,
    //         },
    //         {
    //             id: "22",
    //             value: orderesTrendro,
    //         },
    //         {
    //             id: "23",
    //             value: orderesTrendrr,
    //         },
    //         {
    //             id: "24",
    //             value: orderesTrendsc,
    //         },
    //         {
    //             id: "25",
    //             value: orderesTrendsp,
    //         },
    //         {
    //             id: "26",
    //             value: orderesTrendse,
    //         },
    //         {
    //             id: "27",
    //             value: orderesTrendto,
    //         }
    //     );

    //     selectedValue = arg;

    //     // setting state
    //     this.setState({
    //         amRevenue: formatNum(amRevenue),
    //         ebRevenue: formatNum(ebRevenue),
    //         etRevenue: formatNum(etRevenue),
    //         totalRevenue: formatNum(totalRevenue),
    //         productViews: formatNum(productViews),
    //         purchaseRate: purchaseRate,
    //         checkoutRate: checkoutRate,
    //         abandonedRate: abandonedRate,
    //         ordersTrendStore: ordersTrendStore,
    //         ordersTrendRegion: ordersTrendRegion,
    //         selectedValue: selectedValue,
    //         total_revenue: formatNum(this.state.total_revenue),
    //         total_customer: formatNum(this.state.total_customer),
    //     });
    // };

    updateDashboard = (event) => {
        this.getData(event.value);
        this.setState({ selectedValue: event.value });
    };

    // componentDidMount() {
    //     fetch(url)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             let batchRowValues = data.valueRanges[0].values;

    //             const rows = [];
    //             for (let i = 1; i < batchRowValues.length; i++) {
    //                 let rowObject = {};
    //                 for (let j = 0; j < batchRowValues[i].length; j++) {
    //                     rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
    //                 }
    //                 rows.push(rowObject);
    //             }

    //             // dropdown options
    //             let dropdownOptions = [];

    //             for (let i = 0; i < rows.length; i++) {
    //                 dropdownOptions.push(rows[i].month);
    //             }

    //             dropdownOptions = Array.from(
    //                 new Set(dropdownOptions)
    //             ).reverse();

    //             this.setState(
    //                 {
    //                     items: rows,
    //                     dropdownOptions: dropdownOptions,
    //                     selectedValue: "Jan 2019",
    //                 },
    //                 () => this.getData("Jan 2019")
    //             );
    //         });
    // }

    render() {
        console.log(this.state.ordersTrendRegion);
        return (
            <Container>
                {/* static navbar - top */}
                <Nav className="navbar navbar-expand-lg fixed-top is-white is-dark-text">
                    <Container className="navbar-brand h1 mb-0 text-large font-medium">
                        Olist Dashboard
                    </Container>
                    <Container className="navbar-nav ml-auto">
                        <Container className="user-detail-section">
                            <span className="pr-2">Hi, Sean</span>
                            <span className="img-container">
                                <img
                                    src={UserImg}
                                    className="rounded-circle"
                                    alt="user"
                                />
                            </span>
                        </Container>
                    </Container>
                </Nav>

                {/* static navbar - bottom */}
                <Nav className="navbar fixed-top nav-secondary is-dark is-light-text">
                    <Container className="text-medium">Summary</Container>
                    <Container className="navbar-nav ml-auto">
                        <Dropdown
                            className="pr-2 custom-dropdown"
                            options={this.state.dropdownOptions}
                            onChange={this.updateDashboard}
                            value={this.state.selectedValue}
                            placeholder="Select an option"
                        />
                    </Container>
                </Nav>

                {/* content area start */}
                <Container className="container-fluid pr-5 pl-5 pt-5 pb-5">
                    {/* row 1 - revenue */}
                    <Container className="row">
                        <Container className="col-lg-4 col-sm-6 is-light-text mb-4">
                            <Container className="card grid-card is-card-dark">
                                <Container className="card-heading">
                                    <Container className="is-dark-text-light letter-spacing text-small">
                                        Total Revenue
                                    </Container>
                                </Container>

                                <Container className="card-value pt-4 text-x-large">
                                    <span className="text-large pr-1">$</span>
                                    {this.state.total_revenue}
                                </Container>
                            </Container>
                        </Container>

                        <Container className="col-lg-4 col-sm-6 is-light-text mb-4">
                            <Container className="card grid-card is-card-dark">
                                <Container className="card-heading">
                                    <Container className="is-dark-text-light letter-spacing text-small">
                                        Total Order
                                    </Container>
                                </Container>

                                <Container className="card-value pt-4 text-x-large">
                                    <span className="text-large pr-1">$</span>
                                    {this.state.total_order}
                                </Container>
                            </Container>
                        </Container>

                        <Container className="col-lg-4 col-sm-6 is-light-text mb-4">
                            <Container className="card grid-card is-card-dark">
                                <Container className="card-heading">
                                    <Container className="is-dark-text-light letter-spacing text-small">
                                        Total Customer
                                    </Container>
                                </Container>

                                <Container className="card-value pt-4 text-x-large">
                                    <span className="text-large pr-1">$</span>
                                    {this.state.total_customer}
                                </Container>
                            </Container>
                        </Container>
                    </Container>

                    {/* row 2 - conversion */}
                    <Container className="row">
                        <Container className="col-md-4 col-lg-6 is-light-text mb-4">
                            <Container className="card grid-card is-card-dark">
                                <Container className="card-heading mb-3">
                                    <Container className="is-dark-text-light letter-spacing text-small">
                                        Top Product
                                    </Container>
                                </Container>
                                <Container className="card-value pt-4">
                                    <table class="table table-sm table-dark">
                                        <tbody>
                                            {this.state.top_products.map(
                                                (val, idx) => (
                                                    <tr>
                                                        <th scope="row">
                                                            {idx + 1}
                                                        </th>
                                                        <td>{val.nama}</td>
                                                        <td>
                                                            {val.jumlah_terjual}
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </Container>
                            </Container>
                        </Container>

                        <Container className="col-md-4 col-lg-6 is-light-text mb-4">
                            <Container className="card grid-card is-card-dark">
                                <Container className="card-heading mb-3">
                                    <Container className="is-dark-text-light letter-spacing text-small">
                                        Top Customer
                                    </Container>
                                </Container>
                                <Container className="card-value pt-4">
                                    <table class="table table-sm table-dark">
                                        <tbody>
                                            {this.state.top_customers.map(
                                                (val, idx) => (
                                                    <tr>
                                                        <th scope="row">
                                                            {idx + 1}
                                                        </th>
                                                        <td>{val.nama}</td>
                                                        <td>
                                                            {val.total_beli}
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </Container>
                            </Container>
                        </Container>
                    </Container>

                    {/* row 3 - orders trend */}
                    <Container className="row" style={{ minHeight: "400px" }}>
                        <Container className="col-md-6 mb-4">
                            <Container className="card is-card-dark chart-card">
                                <Container className="chart-container large full-height">
                                    <ReactFC
                                        {...{
                                            type: "bar2d",
                                            width: "100%",
                                            height: "100%",
                                            dataFormat: "json",
                                            containerBackgroundOpacity: "0",
                                            dataEmptyMessage: "Loading Data...",
                                            dataSource: {
                                                chart: {
                                                    theme: "ecommerce",
                                                    caption: "Orders Trend",
                                                    subCaption: "By Seller",
                                                },
                                                data: this.state
                                                    .ordersTrendStore,
                                            },
                                        }}
                                    />
                                </Container>
                            </Container>
                        </Container>

                        <Container className="col-md-6 mb-4">
                            <Container className="card is-card-dark chart-card">
                                <Container className="chart-container large full-height">
                                    <ReactFC
                                        {...{
                                            type: "brazil",
                                            width: "100%",
                                            height: "100%",
                                            dataFormat: "json",
                                            containerBackgroundOpacity: "0",
                                            dataEmptyMessage: "Loading Data...",
                                            dataSource: {
                                                chart: {
                                                    theme: "ecommerce",
                                                    caption: "Orders Trend",
                                                    subCaption: "By Region",
                                                },
                                                colorrange: {
                                                    code: "#F64F4B",
                                                    minvalue: "0",
                                                    gradient: "1",
                                                    color: [
                                                        {
                                                            minValue: "0",
                                                            maxvalue: "50",
                                                            code: "#EDF8B1",
                                                        },
                                                        {
                                                            minvalue: "51",
                                                            maxvalue: "100",
                                                            code: "#18D380",
                                                        },
                                                    ],
                                                },
                                                data: this.state
                                                    .ordersTrendRegion,
                                            },
                                        }}
                                    />
                                </Container>
                            </Container>
                        </Container>
                    </Container>
                </Container>
                {/* content area end */}
            </Container>
        );
    }
}

export default App;
