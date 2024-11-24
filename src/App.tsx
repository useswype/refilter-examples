import './App.css';
import { Filter } from './components/Filter/Filter';

function App() {
  return (
    <>
				<Filter />
      <div className="relative overflow-auto h-[calc(100vh-10rem)]  shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase sticky top-0 z-50 bg-white w-full ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Color
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 100 }).map((_, i) => (
              <tr key={i} className="odd:bg-gray-50 even:bg-white border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap"
                >
                  Apple MacBook Pro 17"
                </th>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">Laptop</td>
                <td className="px-6 py-4">$2999</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="sticky bottom-0 bg-white w-full">
            <td></td>
            <td></td>
            <td scope="row" className="px-6 py-3 text-base">
              Total Rows
            </td>
            <td className="px-6 py-3">{100}</td>
          </tfoot>
        </table>
      </div>
    </>
  );
}

export default App;
