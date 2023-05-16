import "../styles/globals.css";
import Head from "../layout/Header";
import { useState, useEffect } from "react";
import Award from "../components/Award";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Header from "next/head";

function MyApp() {
  const [year, setYear] = useState("");
  const [copyYear, setCopyYear] = useState("");
  const [nobel, setNobel] = useState([]);
  const [yearOption, setOption] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageList, setPage] = useState("");
  const [onPage, setOnPage] = useState(1);
  const [offset, setOffset] = useState(0);

  async function changeYear(val) {
    setCopyYear(val);
  }

  async function filterData() {
    setYear(copyYear);
    setOnPage(1);
    fetchNobel();
  }

  async function fetchNobel() {
    const limit = 5;
    const url = `https://api.nobelprize.org/2.1/nobelPrizes?limit=${limit}&nobelPrizeYear=${copyYear}&offset=0`;
    const response = await fetch(url);
    const data = await response.json();
    setNobel(data);
    const countPage = data.meta.count / limit;
    setPage(Math.round(countPage));
    setIsLoading(false);
  }

  async function pageChange(event, page) {
    const offsetDetault = 5
    const countPage = page > onPage ? page - onPage : onPage - page
    const checkPoint = countPage * offsetDetault
    const summary = page > onPage ? checkPoint + offset : checkPoint - offset
    setOffset(summary);
    setOnPage(page);
    setIsLoading(true);
    const limit = 5;
    const url = `https://api.nobelprize.org/2.1/nobelPrizes?limit=${limit}&nobelPrizeYear=${copyYear}&offset=${summary}`;
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
    return <h2>ไม่พบข้อมูล</h2>;
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

            <Button
              className="mt-2"
              size="small"
              variant="outlined"
              onClick={filterData}
            >
              Apply Filter
            </Button>
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

          <div>
            <Pagination count={pageList} page={onPage} onChange={pageChange} variant="outlined" shape="rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyApp;
