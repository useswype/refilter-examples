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
    <div>
      <div className="flex flex-row-reverse justify-between">
        <a href="https://swypex.com">
          <svg
            viewBox="0 0 1024 182"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-[31px] w-[175px]"
          >
            <path
              d="M295.154 42.063C290.87 16.372 270.96 0 241.725 0c-29.991 0-54.185 13.853-54.185 37.782 0 25.187 20.162 33.75 38.56 37.53l20.162 4.03c14.617 3.022 27.47 8.815 27.47 22.416 0 12.594-14.113 20.15-31.503 20.15-20.162 0-30.999-10.327-34.527-27.706h-24.194c2.52 23.676 22.682 47.101 58.217 47.101 30.999 0 55.193-15.365 55.193-42.064 0-26.195-21.674-35.514-46.372-40.3l-19.154-3.778c-13.105-2.519-20.666-7.556-20.666-18.387 0-12.342 15.122-17.128 28.479-17.128 15.877 0 28.479 6.297 32.007 22.417h23.942Zm64.617 60.703L333.813 2.519h-24.699l39.064 135.509h20.918l28.983-109.062 29.991 109.062h20.918l39.063-135.51h-24.698l-25.959 100.248L410.428 2.519h-23.69l-26.967 100.247ZM584.712 2.519l-33.519 104.529-34.527-104.53h-25.455l48.893 135.51-1.008 2.771c-6.049 21.158-13.357 22.165-28.479 22.165h-9.325v19.143h11.845c30.243 0 37.3-8.816 47.129-38.286L608.655 2.519h-23.943Zm37.843 0v179.588h22.934v-64.481c8.317 14.357 22.682 23.677 44.357 23.677 30.999 0 57.965-25.692 57.965-70.526 0-44.582-26.966-70.525-57.965-70.525-21.675 0-36.04 9.32-44.357 23.676V2.518h-22.934Zm21.926 68.258c0-35.766 19.154-50.879 39.568-50.879 23.438 0 38.812 18.64 38.812 50.88 0 32.239-15.374 50.878-38.812 50.878-20.414 0-39.568-15.112-39.568-50.879Zm244.854 7.053C892.36 35.01 867.409.252 826.077.252c-37.047 0-65.778 27.454-65.778 70.273 0 40.049 23.69 70.778 66.534 70.778 33.015 0 54.437-19.143 60.738-42.567h-23.69c-5.797 13.349-16.886 22.417-37.048 22.417-20.162 0-40.828-14.105-41.836-43.323h104.338Zm-63.258-57.932c24.195 0 38.56 19.143 39.064 38.285h-79.892c2.016-27.202 20.414-38.285 40.828-38.285Zm193.383-17.38h-25.703L960.49 49.117 927.475 2.519h-27.471l46.877 65.74-49.901 69.769h26.21l36.544-51.634 36.795 51.634H1024l-50.657-70.777 46.117-64.732Z"
              fill="#000"
            ></path>
            <mask
              id="logo_white_svg__a"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="142"
              height="142"
            >
              <path fill="#D9D9D9" d="M0 0h141.483v141.483H0z"></path>
            </mask>
            <g mask="url(#logo_white_svg__a)" fill="#fff">
              <path d="M6.145 42.638 43.27 5.89h27.746v27.394L33.756 70.733H6.146V42.638ZM76.806 36.74 113.93-.006h27.746v27.394l-37.259 37.447h-27.61V36.74ZM70.91 107.387l37.123-36.746h27.746v27.393L98.52 135.482H70.91v-28.095ZM.142 113.284l37.124-36.746h27.746v27.393l-37.259 37.552-27.61-.104v-28.095Z"></path>
            </g>
          </svg>
        </a>
        <Filter
          onApply={(value) => {
            handleFilterApply(value);
            return true;
          }}
        />
      </div>

      <div className="relative mt-4 overflow-auto h-[calc(100vh-10rem)] shadow-md sm:rounded-lg border">
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
                <td className="px-6 py-4">{format(item.date, 'dd-MM-yyyy')}</td>
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

      <div className="sticky mt-4 mb-10">
        <div className="flex flex-row items-center justify-between">
          <div>
            Built by{' '}
            <a className="text-blue-700" href="https://swypex.com">
              Swypex
            </a>{' '}
            Engineering
          </div>
          <div>
            <a
              href="https://github.com/useswype/refilter"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="w-5 h-5"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>

              <span>View on GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
