import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 200,
      body: "Ce n'était pas une requête POST !"
    };
  }

  try {
    const response = await fetch(process.env.GOOGLE_SHEETS_URL as string);

    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération du CSV : ${response.status} ${response.statusText}`);
    }

    const csvData = await response.text();
    const csvLines = csvData.split('\r\n');

    const currencies = csvLines.map((line: string) => {
      const [
        name,
        code,
        CAD,
        CHF,
        CNY,
        EUR,
        GBP,
        JPY,
        USD
      ] = line.split(',');

      return {
        code,
        currencies: {
          CAD: parseFloat(CAD),
          CHF: parseFloat(CHF),
          CNY: parseFloat(CNY),
          EUR: parseFloat(EUR),
          GBP: parseFloat(GBP),
          JPY: parseFloat(JPY),
          USD: parseFloat(USD)
        },
        name
      };
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': process.env.ACCESS_CONTROL_ALLOW_ORIGIN as string
      },
      body: JSON.stringify(currencies)
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    };
  }
};

export { handler };