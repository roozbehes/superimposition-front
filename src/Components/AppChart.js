import React from "react";
import Box from "@mui/material/Box";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
  Label,
} from "recharts";

class AppChart extends React.Component {
  constructor(props) {
    super(props);
    let ch = [];
    let trends = props.data.trends;

    if ("R" in trends && "E" in trends) {
      for (let i = 0; i < trends.S.length; i++) {
        ch = [
          ...ch,
          {
            I: trends.I[i],
            S: trends.S[i],
            time: i,
            R: trends.R[i],
            E: trends.E[i],
          },
        ];
      }
    } else if ("R" in trends) {
      for (let i = 0; i < trends.S.length; i++) {
        ch = [
          ...ch,
          { I: trends.I[i], S: trends.S[i], time: i, R: trends.R[i] },
        ];
      }
    } else if ("E" in trends) {
      for (let i = 0; i < trends.S.length; i++) {
        ch = [
          ...ch,
          { I: trends.I[i], S: trends.S[i], time: i, E: trends.E[i] },
        ];
      }
    } else {
      for (let i = 0; i < trends.S.length; i++) {
        ch = [...ch, { I: trends.I[i], S: trends.S[i], time: i }];
      }
    }

    this.state = {
      char: ch,
    };
  }

  render() {
    return (
      <>
        <ResponsiveContainer width="100%" height={430}>
          <LineChart
            // width={730}
            // height={250}
            data={this.state.char}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />

            <YAxis>
              <Label value="&rho;" position="left" />
            </YAxis>
            <Tooltip />
            <Legend align="right" verticalAlign="top" iconSize={30} />
            <Line
              type="monotone"
              dataKey="S"
              stroke="#1ad3e8"
              strokeWidth="3"
            />
            <Line
              type="monotone"
              dataKey="I"
              stroke="#d9295b"
              strokeWidth="3"
            />
            {"R" in this.props.data.trends ? (
              <Line
                type="monotone"
                dataKey="R"
                stroke="#1ae84a"
                strokeWidth="3"
              />
            ) : (
              ""
            )}
            {"E" in this.props.data.trends ? (
              <Line
                type="monotone"
                dataKey="E"
                stroke="#1a344a"
                strokeWidth="3"
              />
            ) : (
              ""
            )}
          </LineChart>
        </ResponsiveContainer>

        <div className="container">
          <div className="row mt-3 pl-3 px-5">
            <div className="col-lg-4 border border-4 m-3">
              <p># of Nodes: {this.props.graph_props.num_nodes}</p>
              <p># of Edges: {this.props.graph_props.num_edges}</p>
              <p>Edge Density: {this.props.graph_props.edge_density}</p>
            </div>

            <div className="col-lg-4 border border-4 m-3">
              <p># of Groups: {this.props.graph_props.num_groups}</p>
              <p>
                Average Group Size: {this.props.graph_props.average_group_size}
              </p>
              <p>Average Degree: {this.props.graph_props.avg_degree}</p>
            </div>

            <div className="col-lg-8 border border-4 m-3">
              <p>
                Average ratio of Sucseptible Nodes: {this.props.res_props.S}
              </p>
              <p>Average ratio of Infected Nodes: {this.props.res_props.I}</p>
              {"E" in this.props.res_props ? (
                <p>Average ratio of Exposed Nodes: {this.props.res_props.E}</p>
              ) : (
                ""
              )}
              {"R" in this.props.res_props ? (
                <p>Average ratio of Removed Nodes: {this.props.res_props.R}</p>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AppChart;
