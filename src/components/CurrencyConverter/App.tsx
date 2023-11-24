import { useEffect, useMemo, useState } from 'preact/hooks';
import Wrapper from '@components/Wrapper.tsx';

type CurrenciesProps = {
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
    <Wrapper>
      <div class="w-full md:max-w-[488px]">
        <div class="grid grid-cols-1 gap-6">
          <table class="table-auto w-full min-h-[451px] bg-white">
            <thead>
              <tr>
                <th id="name" class="px-4 py-2 bg-gray-200">Nom</th>
                <th id="code" class="px-4 py-2 bg-gray-200">Code</th>
                <th id="value" class="px-4 py-2 bg-gray-200">Valeur</th>
              </tr>
            </thead>
            <tbody>
            {getCurrencies.map((item, i) => (
              <tr
                role="button"
                tabIndex={0}
                key={i}
                class={`cursor-pointer ${item.code === code && 'bg-yellow-500'}`}
                onClick={() => setCode(item.code)}
                onKeyDown={(e) => e.key === 'Enter' && setCode(item.code)}
              >
                <td headers="name" class="border px-2 py-2">{item.name}</td>
                <td headers="code" class="border px-2 py-2">{item.code}</td>
                <td headers="value" class="border px-2 py-2">{getAmount(item.value)}</td>
              </tr>
            ))}
            </tbody>
          </table>
          <label class="block">
            <span class="text-gray-700">Montant:</span>
            <input
              class="mt-1 block w-full"
              name="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat((e.target as HTMLTextAreaElement).value))}
            />
          </label>
        </div>
      </div>
    </Wrapper>
  );
};

export default App;
