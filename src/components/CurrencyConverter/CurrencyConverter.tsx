import { useEffect, useMemo, useState } from 'preact/hooks';
import { formatCurrency } from 'utils';

interface CurrenciesProps {
  code: string;
  currencies: {
    CAD: number;
    CHF: number;
    CNY: number;
    EUR: number;
    GBP: number;
    JPY: number;
    USD: number;
  };
  name: string;
};

const CurrencyConverter = () => {
  const [amount, setAmount] = useState<number>(10000);
  const [codeCurrency, setCodeCurrency] = useState<string>('CAD');
  const [currencies, setCurrencies] = useState<CurrenciesProps[]>([]);

  const controller = new AbortController();

  useEffect(() => {
    async function getData() {
      const response = await fetch('/.netlify/functions/currencies', {
        method: 'POST',
        signal: controller.signal
      });
      const data = await response.json();
      setCurrencies(data);
    }

    getData();

    return () => {
      controller.abort();
    };
  }, []);

  const getCurrencies = useMemo(() => {
    return currencies.map((currency: CurrenciesProps) => {
      return {
        code: currency.code,
        name: currency.name,
        value: currency.currencies[codeCurrency as keyof typeof currency.currencies]
      };
    });
  }, [codeCurrency, currencies]);

  const getAmount = (currency: string, locale: string, value: number) => {
    return (value * amount).toLocaleString(locale, {
      currency,
      minimumSignificantDigits: 10,
      style: 'currency'
    });
  };

  return (
    <div class="w-full max-w-md m-auto xl:m-0">
      <table class="table-auto w-full min-h-[451px]">
        <thead>
          <tr>
            <th id="name" class="px-2 py-4 border border-black dark:border-white">Nom</th>
            <th id="code" class="px-2 py-4 border border-black dark:border-white">Code</th>
            <th id="value" class="px-2 py-4 border border-black dark:border-white">Valeur</th>
          </tr>
        </thead>
        <tbody>
        {getCurrencies.map(({value, name, code}, i) => (
          <tr
            role="button"
            tabIndex={0}
            key={i}
            class={`cursor-pointer ${code === codeCurrency ? 'bg-yellow-400 dark:text-black' : ''} `}
            onClick={() => setCodeCurrency(code)}
            onKeyDown={(e) => e.key === 'Enter' && setCodeCurrency(code)}
          >
            <td headers="name" class="p-2 border border-black dark:border-white">{name}</td>
            <td headers="code" class="p-2 border border-black dark:border-white">{code}</td>
            <td headers="value" class="p-2 border border-black dark:border-white">{formatCurrency(value * amount, 'fr-CA', code)}</td>
          </tr>
        ))}
        </tbody>
      </table>
      <p class="mt-4">
        <label
          class="block mb-2"
          for="amount">
            Montant
        </label>
        <input
          aria-label="Montant"
          class="w-full h-12 p-3 border rounded-md bg-inherit text-inherit focus:border-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 focus:ring-offset-white focus:ring-opacity-50"
          id="amount"
          name="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat((e.target as HTMLInputElement).value))}
        />
      </p>
    </div>
  );
};

export default CurrencyConverter;
