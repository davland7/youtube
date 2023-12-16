import { useEffect, useMemo, useState } from 'preact/hooks';

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

const App = () => {
  const [amount, setAmount] = useState<number>(10000);
  const [code, setCode] = useState<string>('CAD');
  const [currencies, setCurrencies] = useState<CurrenciesProps[]>([]);

  const controller = new AbortController();

  useEffect(() => {
    async function getData() {
      const response = await fetch('/api/currencies', {
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
        value: currency.currencies[code as keyof typeof currency.currencies]
      };
    });
  }, [code, currencies]);

  const getAmount = (value: number) => {
    return (value * amount).toLocaleString('fr-CA', {
      style: 'currency',
      currency: code,
      minimumSignificantDigits: 10
    });
  };

  return (
    <div class="p-6 w-full max-w-md m-auto xl:m-0">
      <table class="table-auto w-full min-h-[451px]">
        <thead>
          <tr>
            <th id="name" class="px-2 py-4 border border-black dark:border-white">Nom</th>
            <th id="code" class="px-2 py-4 border border-black dark:border-white">Code</th>
            <th id="value" class="px-2 py-4 border border-black dark:border-white">Valeur</th>
          </tr>
        </thead>
        <tbody>
        {getCurrencies.map((item, i) => (
          <tr
            role="button"
            tabIndex={0}
            key={i}
            class={`cursor-pointer ${item.code === code ? 'bg-yellow-400 dark:text-black' : ''} `}
            onClick={() => setCode(item.code)}
            onKeyDown={(e) => e.key === 'Enter' && setCode(item.code)}
          >
            <td headers="name" class="p-2 border border-black dark:border-white">{item.name}</td>
            <td headers="code" class="p-2 border border-black dark:border-white">{item.code}</td>
            <td headers="value" class="p-2 border border-black dark:border-white">{getAmount(item.value)}</td>
          </tr>
        ))}
        </tbody>
      </table>
      <p class="mt-4">
        <label class="block mb-2">Montant</label>
        <input
          class="w-full h-12 p-3 rounded-2xl border bg-inherit text-inherit border-black dark:border-white"
          name="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat((e.target as HTMLInputElement).value))}
        />
      </p>
    </div>
  );
};

export default App;
