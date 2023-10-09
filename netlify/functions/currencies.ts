import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 200,
      body: "Ce n'était pas une requête POST !"
    };
  }

  try {
    const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vRA5BiJUKJ9BCftgCP6UtKg9IifRTHfC7S0jdNF1s1do9YT6F2wpCJBQkWNQJUAclB5yDbEtq8VkypX/pub?gid=994685466&single=true&output=csv'/* process.env.GOOGLE_SHEETS_URL as string */);

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
      body: JSON.stringify(currencies),
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=0, must-revalidate',
        'Netlify-CDN-Cache-Control': 'public, max-age=1200, must-revalidate'
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};

export { handler };