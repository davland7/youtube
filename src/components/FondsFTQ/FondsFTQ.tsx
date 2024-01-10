import { useEffect, useRef } from "preact/hooks";
import Chart from "chart.js/auto";
import { data } from "./data";
import { formatCurrency } from "utils";

const FondsFTQ = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");

    if (ctx) {
      new Chart(ctx, {
        type: "line",
        data: {
          labels: data.flatMap((entry) => [
            `30 Novembre ${entry.year}`,
            `31 Mai ${entry.year}`,
          ]).reverse(),
          datasets: [
            {
              label: "Prix de l'action",
              data: data.flatMap((entry) => [
                entry.november,
                entry.may,
              ]).reverse(),
              borderColor: "#eab308",
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
                  return formatCurrency(parseFloat(value as string), 'fr-CA', 'CAD');
                },
              },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  return "Prix : " + formatCurrency(context.parsed.y, 'fr-CA', 'CAD');
                },
              },
            },
          },
        },
      });
    }
  }, []);

  return (
    <div>
      <canvas
        ref={chartRef}
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
                <td headers="may">{formatCurrency(item.may, 'fr-CA', 'CAD')}</td>
                <td headers="november">{formatCurrency(item.november, 'fr-CA', 'CAD')}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FondsFTQ;
