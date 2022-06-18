import React from "react";
import AppChart from "./AppChart";
import AppMenu from "./Menu";
import Loading from "./LoadingPage";
import "./App.css";

class MainPage extends React.Component {
  constructor() {
    super();
    this.state = {
      results: {},
      results_recieved: false,
      isLoading:false
    };
  }

  handleLoading = (stat)=>{
    this.setState({...this.state , isLoading : stat});
  }

  handleResult = (res) => {
    this.setState({ ...this.state, isLoading : false, results_recieved: false });
    if (res !== undefined) {
      this.setState({
        results: res[0],
        results_recieved: true,
        graph_props: res[1],
        res_props: res[2],
      });
    }
  };
  //mt-4
  render() {
    return (
      <div>
        <div className="container">
          <div className="pb-2 pt-4 mb-4 border-bottom h3">
            Online Network Diffusion Simulator
          </div>
          <div className="row">
            <div className="col-lg-3 mt-1 b-2 border rounded border-4">
              <AppMenu handleLoading={this.handleLoading} handleResult={this.handleResult} />
            </div>
            <div className="col-lg-9 mt-1">
              <h3 className="text-center border-bottom border-4 pb-2 mb-2">
                Simulation Results
              </h3>
              {this.state.results_recieved ? (
                <AppChart
                  data={this.state.results}
                  graph_props={this.state.graph_props}
                  res_props={this.state.res_props}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        {
          this.state.isLoading?
          <Loading/>:""
        }
      </div>
    );
  }
}

export default MainPage;
