import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import Head from "next/head";
import { Col, Divider, Row, Select, Typography } from "antd";

const { Title } = Typography;

const { Option } = Select;

const Home = () => {
  const canvasEl = useRef(null);
  const [valor, setValor] = useState("1hrs");

  const colors = {
    purple: {
      default: "rgba(149, 76, 233, 1)",
      half: "rgba(149, 76, 233, 0.5)",
      quarter: "rgba(149, 76, 233, 0.25)",
      zero: "rgba(149, 76, 233, 0)",
    },
    indigo: {
      default: "rgba(80, 102, 120, 1)",
      quarter: "rgba(80, 102, 120, 0.25)",
    },
  };

  const getValor = (value) => {
    setValor(value);
    // console.log(value);
  };

  useEffect(() => {
    const ctx = canvasEl.current.getContext("2d");

    const gradient = ctx.createLinearGradient(0, 16, 0, 600);
    gradient.addColorStop(0, colors.purple.half);
    gradient.addColorStop(0.65, colors.purple.quarter);
    gradient.addColorStop(1, colors.purple.zero);

    const weight1 = [
      60.0, 60.2, 59.1, 61.4, 59.9, 60.2, 59.8, 58.6, 59.6, 59.2,
    ];
    const weight2 = [35.0, 40.2, 59.1, 3.4, 59.9, 23.2, 56.8, 23.6, 43.6, 78.2];
    const weight3 = [
      64.0, 12.2, 43.1, 45.4, 89.9, 69.2, 45.8, 34.6, 33.6, 19.2,
    ];

    const labels = [
      "Week 1",
      "Week 2",
      "Week 3",
      "Week 4",
      "Week 5",
      "Week 6",
      "Week 7",
      "Week 8",
      "Week 9",
    ];

    const data = {
      labels: labels,
      datasets: [
        {
          backgroundColor: gradient,
          label: "Entradas",
          data:
            valor === "1hrs" ? weight1 : valor === "2hrs" ? weight2 : weight3,
          fill: true,
          borderWidth: 2,
          borderColor: colors.purple.default,
          lineTension: 0.2,
          pointBackgroundColor: colors.purple.default,
          pointRadius: 3,
        },
      ],
    };

    const config = {
      type: "line",
      data: data,
    };

    const myLineChart = new Chart(ctx, config);

    return function cleanup() {
      myLineChart.destroy();
    };
  }, [valor]);

  return (
    <>
      <Head>
        <title>Medidor</title>
      </Head>

      <div className="main-home">
        <Row gutter={16}>
          <Col span={24}>
            <Title> Monitor de registros.</Title>
            <Divider />
            <Select
              defaultValue="1hrs"
              style={{ width: 300 }}
              onChange={getValor}
              readOnly={true}
            >
              <Option value="1hrs">Comparar 1 hora antes</Option>
              <Option value="2hrs">Comparar 2 horas antes</Option>
              <Option value="3hrs">Comparar 3 horas antes </Option>
            </Select>
          </Col>
        </Row>
        <Divider />
        <Col span={24} className="chartjs">
          <canvas id="myChart1" ref={canvasEl} />
        </Col>
      </div>
    </>
  );
};

export default Home;
