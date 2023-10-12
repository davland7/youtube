import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  try {
    const response = await fetch(process.env.GOOGLE_SHEETS_URL as string);

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
        'Access-Control-Allow-Origin': process.env.ACCESS_CONTROL_ALLOW_ORIGIN as string,
        'Cache-Control': 'max-age=300, public'
      },
      body: JSON.stringify(currencies)
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: error.message
    };
  }
};

export { handler };