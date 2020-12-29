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


    updateDashboard = (event) => {
        this.getData(event.value);
        this.setState({ selectedValue: event.value });
    };


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
                            <span className="pr-2">Hi, Admin</span>
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
                                        Top Products
                                    </Container>
                                </Container>
                                <Container className="card-value pt-4">
                                    <table class="table table-sm table-dark">
                                        <thead>
                                            <th></th>
                                            <th>Product</th>
                                            <th>Sold</th>
                                        </thead>
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
                                        Top Customers
                                    </Container>
                                </Container>
                                <Container className="card-value pt-4">
                                    <table class="table table-sm table-dark">
                                        <thead>
                                            <th></th>
                                            <th>Customer</th>
                                            <th>Purchase</th>
                                        </thead>
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
                                                            maxvalue: "10000",
                                                            code: "#EDF8B1",
                                                        },
                                                        {
                                                            minvalue: "10001",
                                                            maxvalue: "60000",
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
