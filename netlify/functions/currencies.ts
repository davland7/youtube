import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
}

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  try {
    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers: CORS_HEADERS,
      }
    }

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
        ...CORS_HEADERS,
        'Content-Type': 'application/json',
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
