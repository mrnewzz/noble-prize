import "../styles/globals.css";
import Head from "../layout/Header";
import { useState, useEffect } from "react";
import Award from "../components/Award";
import Header from "next/head";

function MyApp() {
  const [year, setYear] = useState("");
  const [copyYear, setCopyYear] = useState("");
  const [nobel, setNobel] = useState([]);
  const [yearOption, setOption] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function changeYear(val) {
    setCopyYear(val);
  }

  async function filterData() {
    setYear(copyYear);
    fetchNobel();
  }

  async function fetchNobel() {
    const url = `https://api.nobelprize.org/2.1/nobelPrizes?limit=5&nobelPrizeYear=${copyYear}`;
    const response = await fetch(url);
    const data = await response.json();
    setNobel(data);
    setIsLoading(false);
  }

  useEffect(() => {

    async function fetchYear() {
      const minYear = 1901;
      const maxYear = 2023;
      const totalYear = [];
      for (let index = minYear; index < maxYear; index++) {
        totalYear.push(index.toString());
      }
      setOption(totalYear);
    }

    fetchYear();
    fetchNobel();
  }, []);

  if (isLoading) {
    return <h2>Loading.....</h2>;
  }

  if (nobel.nobelPrizes.length === 0) {
    return <h2>ไม่พบข้อมูล</h2>
  }

  return (
    <div>
      <Header>
        <title>Noble prize</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
      </Header>

      <Head year={year} />

      <div className="grid-container">
        <div className="grid-item1">
          <div className="filter-year">
            <select
              onChange={(e) => changeYear(e.target.value)}
              className="font-small"
            >
              <option value="">กำหนดปี</option>
              {yearOption.map((val, index) => {
                return (
                  <option key={index} value={val}>
                    {val}
                  </option>
                );
              })}
            </select>

            <button
              type="button"
              className="btn btn-sm mt-2 btn-outline-secondary"
              onClick={filterData}
            >
              Apply Filter
            </button>
          </div>
        </div>

        <div className="grid-item2">
          <div>
            {nobel.nobelPrizes.map((val, index) => {
              return (
                <div key={index}>
                  <Award nobel={val} />
                </div>
              );
            })}
          </div>

          <nav className="mt-2">
            <ul className="pagination pagination-sm">
              <li className="page-item">
                <a className="page-link" href="#">
                  Previous
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default MyApp;
