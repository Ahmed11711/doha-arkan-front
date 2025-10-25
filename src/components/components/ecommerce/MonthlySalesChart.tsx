import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { useEffect, useState } from "react";
import ApiClient from "../../../services/API"; // لو عندك كلاس API

export default function MonthlySalesChart() {
  const [series, setSeries] = useState([
    {
      name: "Sales",
      data: Array(12).fill(0), // 🔹 تصفير القيم مبدئيًا (12 شهر)
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);

  // useEffect(() => {
  //   // 🟢 هنا بنجلب البيانات من الـ API
  //   const fetchSalesData = async () => {
  //     try {
  //       const res = await ApiClient.get("/dashboard/monthly-sales"); // endpoint تجريبي
  //       const salesData = res.data.sales || [];

  //       // لو الداتا أقل من 12 شهر نكملها بأصفار
  //       const fullData = [...salesData];
  //       while (fullData.length < 12) fullData.push(0);

  //       setSeries([{ name: "Sales", data: fullData }]);
  //     } catch (err) {
  //       console.error("❌ Error fetching monthly sales:", err);
  //     }
  //   };

  //   fetchSalesData();
  // }, []);

  const options: ApexOptions = {
    colors: ["#465fff"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 180,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "39%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
    },
    yaxis: { title: { text: undefined } },
    grid: { yaxis: { lines: { show: true } } },
    fill: { opacity: 1 },
    tooltip: {
      x: { show: false },
      y: { formatter: (val: number) => `$${val}` },
    },
  };

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 sm:pt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Monthly Sales</h3>

        <div className="relative inline-block">
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            ⋮
          </button>
          <Dropdown isOpen={isOpen} onClose={closeDropdown} className="w-40 p-2">
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
            >
              View More
            </DropdownItem>
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
            >
              Delete
            </DropdownItem>
          </Dropdown>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="-ml-5 min-w-[650px] xl:min-w-full pl-2">
          <Chart options={options} series={series} type="bar" height={180} />
        </div>
      </div>
    </div>
  );
}
