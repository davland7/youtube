import { useState, useEffect, useRef } from "preact/hooks";
import Chart, { type Point } from "chart.js/auto";
import { data } from "./data";
import { formatCurrency } from "utils";

const DATA_TO_SHOW = 5;

const FondsFTQ = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [dataToShow, setDataToShow] = useState(DATA_TO_SHOW);
  const chartInstanceRef = useRef<Chart | null>(null);

  const updateChartData = () => {
    const ctx = chartRef.current?.getContext("2d");
    const reversedData = data.slice(0, dataToShow).reverse();
    const labels = reversedData.flatMap((entry) => [
      `31 Mai ${entry.year}`,
      `30 Novembre ${entry.year}`,
    ]);

    const values = reversedData.flatMap((entry) => [
      entry.may,
      entry.november,
    ]);

    if (ctx) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      chartInstanceRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "Prix de l’action",
              data: values,
              borderColor: "#eab308",
              borderWidth: 2,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
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
                  return `Prix : ${formatCurrency(context.parsed.y, 'fr-CA', 'CAD')}`;
                },
              },
            },
          },
        },
      });
    }
  };

  useEffect(() => {
    updateChartData();
  }, [dataToShow]);

  const handleChartClick = () => {
    const lastData = data[dataToShow - 1];
    if (lastData) {
      addData(`30 Novembre ${lastData.year}`, lastData.november);
      setDataToShow((prevDataToShow) => prevDataToShow + DATA_TO_SHOW);
    }
  };

  const addData = (label: unknown, newData: number | [number, number] | Point | null) => {
    if (chartInstanceRef.current) {
      if (label && newData !== null) {
        chartInstanceRef?.current?.data?.labels?.push(label);
        chartInstanceRef.current.data.datasets.forEach((dataset) => {
          dataset.data.push(newData);
        });
        chartInstanceRef.current.update();
      }
    };
  };

  return (
    <div>
      <canvas
        ref={chartRef}
        class="my-10"
        aria-hidden="true"
        role="img"
      />
      <p class="max-w-96 m-auto mb-5">
        <button
          class="max-w-96 m-auto w-full p-3 leading-normal border-black dark:border-white border rounded-full bg-yellow-400 disabled:bg-yellow-400 disabled:cursor-not-allowed hover:bg-yellow-500 focus:bg-yellow-500 dark:text-black font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 focus:ring-offset-white focus:ring-opacity-50"
          aria-label="Voir plus"
          type="button"
          onClick={handleChartClick}
        >
          Je m’abonne
        </button>
      </p>
      <table class="max-w-96 m-auto" id="data">
        <caption class="mb-5">
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
          {data.slice(0, dataToShow).map(({ year, may, november }) => {
            return (
              <tr>
                <td headers="year">{year}</td>
                <td headers="may">{formatCurrency(may, 'fr-CA', 'CAD')}</td>
                <td headers="november">{november && formatCurrency(november, 'fr-CA', 'CAD')}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FondsFTQ;
