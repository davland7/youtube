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

  const currencyMap = useMemo(() => {
    const map = new Map();
    currencies.forEach(currency => map.set(currency.code, currency));
    return map;
  }, [currencies]);

  const getCurrencies = useMemo(() => {
    const selectedCurrency = currencyMap.get(codeCurrency);
    if (!selectedCurrency) return [];

    return Array.from(currencyMap.values()).map(currency => ({
      code: currency.code,
      name: currency.name,
      value: selectedCurrency.currencies[currency.code] || 0
    }));
  }, [codeCurrency, currencyMap]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setCodeCurrency((e.target as HTMLTableRowElement).cells[1]?.textContent ?? '');
    }
  }

  return (
    <div class="w-full max-w-md m-auto xl:m-0">
      <table class="table-auto w-full min-h-[457px]">
        <thead>
          <tr>
            <th id="name" class="px-2 py-4 bg-gray-200 border border-black dark:border-white">Nom</th>
            <th id="code" class="px-2 py-4 bg-gray-200 border border-black dark:border-white">Code</th>
            <th id="value" class="px-2 py-4 bg-gray-200 border border-black dark:border-white">Valeur</th>
          </tr>
        </thead>
        <tbody>
        {getCurrencies.map(({value, name, code}, i) => (
          <tr
            role="button"
            tabIndex={0}
            key={i}
            class={`cursor-pointer ${code === codeCurrency ? 'bg-yellow-500 dark:text-black' : ''} `}
            onClick={() => setCodeCurrency(code)}
            onKeyDown={handleKeyDown}
          >
            <td headers="name" class="px-2 py-4 border border-black dark:border-white">{name}</td>
            <td headers="code" class="px-2 py-4 border border-black dark:border-white">{code}</td>
            <td headers="value" class="px-2 py-4 border border-black dark:border-white">{formatCurrency(value * amount, 'fr-CA', code, 10)}</td>
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
          class="w-full p-3 border-black rounded bg-inherit text-inherit"
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
