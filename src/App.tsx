import { format } from 'date-fns';
import './App.css';
import { Filter, FilterValues } from './components/Filter/Filter';

import fakeData from './fakeData.json';
import { useState } from 'react';

function App() {
  const [data, setData] = useState(fakeData);

  function handleFilterApply(value: FilterValues) {
    let filteredData = fakeData;
    if (value.date) {
      filteredData = filteredData.filter((item) => {
        const date = new Date(item.date);
        if (value.date?.from !== undefined && value.date?.to !== undefined) {
          return date >= value.date.from && date <= value?.date?.to;
        }
      });
    }

    if (value.text.length > 0) {
      filteredData = filteredData.filter((item) =>
        value.text?.includes(item.category)
      );
    }

    if (value.amount) {
      filteredData = filteredData.filter((item) => {
        const price = parseFloat(item.price);
        if (value.amount !== null) {
          return price >= value.amount.min && price <= value.amount.max;
        }
      });
    }

    setData(filteredData);
  }

  return (
    <>
      <Filter
        onApply={(value) => {
          handleFilterApply(value);
          return true;
        }}
      />
      <div className="relative mt-4 overflow-auto h-[calc(100vh-10rem)] shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left h-full">
            <thead className="text-xs uppercase sticky top-0 z-50 bg-white w-full">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Price (EGP)
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr key={i} className="odd:bg-gray-50 even:bg-white border-b h-2">
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    {item.productName}
                  </td>
                  <td className="px-6 py-4">{item.category}</td>
                  <td className="px-6 py-4">
                    {format(item.date, 'dd-MM-yyyy')}
                  </td>
                  <td className="px-6 py-4">{item.price}</td>
                </tr>
              ))}
            </tbody>
          <tfoot className="sticky bottom-0 bg-gray-100 w-full">
            <tr>
              <td></td>
              <td></td>
              <td scope="row" className="px-6 py-3 text-base">
                Total Rows
              </td>
              <td className="px-6 py-3">{data.length}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="absolute bottom-10">
        <p>
          Built by{' '}
          <a className="text-blue-700" href="https://swypex.com">
            Swypex
          </a>{' '}
          Engineering
        </p>
      </div>
    </>
  );
}

export default App;
