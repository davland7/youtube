import { useEffect, useRef } from "preact/hooks";
import Chart from "chart.js/auto";
import { data } from "./data";

const FondsFTQ = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    new Chart(ctx, {
      type: "line",
      data: {
        labels: data.flatMap((entry) => [
          `30 Novembre ${entry.year}`,
          `31 Mai ${entry.year}`,
        ]).reverse(),
        datasets: [
          {
            data: data.flatMap((entry) => [
              entry.november,
              entry.may,
            ]).reverse(),
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
            fill: true,
          },
        ],
      },
      options: {
        scales: {
          y: {
            ticks: {
              callback: (value) => {
                return value.toLocaleString("fr-CA", {
                  style: "currency",
                  currency: "CAD",
                });
              },
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                return "Prix : " +
                  new Intl.NumberFormat("fr-CA", {
                    style: "currency",
                    currency: "CAD",
                  }).format(context.parsed.y);
              },
            },
          },
        },
      },
    });
  }, []);

  return (
    <div>
      <canvas
        ref={chartRef}
        width="960"
        height="400"
        aria-hidden="true"
        role="img"
      >
      </canvas>
      <table class="max-w-96 m-auto" id="data">
        <caption>
          Historique du prix d'une action
        </caption>
        <thead>
          <tr>
            <th id="year" scope="col">Année</th>
            <th id="may" scope="col">31 mai</th>
            <th id="november" scope="col">30 novembre</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr>
                <td headers="year">{item.year}</td>
                <td headers="may">{item.may}</td>
                <td headers="november">{item.november}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FondsFTQ;
