import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import ApiClient from "../../../services/API";
import { useTranslation } from "react-i18next";

export default function MonthlyTarget() {
  const { t } = useTranslation();

  const [series, setSeries] = useState<number[]>([0]);
  const [targetData, setTargetData] = useState({
    target: 0,
    revenue: 0,
    today: 0,
    growth: 0,
    progress: 0,
    message: "",
  });

  const [isOpen, setIsOpen] = useState(false);

  const options: ApexOptions = {
    colors: ["#465FFF"],
    chart: { fontFamily: "Outfit, sans-serif", type: "radialBar", height: 330, sparkline: { enabled: true } },
    plotOptions: {
      radialBar: {
        startAngle: -85,
        endAngle: 85,
        hollow: { size: "80%" },
        track: { background: "#E4E7EC", strokeWidth: "100%", margin: 5 },
        dataLabels: {
          name: { show: false },
          value: {
            fontSize: "36px",
            fontWeight: "600",
            offsetY: -40,
            color: "#1D2939",
            formatter: (val) => `${val}%`,
          },
        },
      },
    },
    fill: { type: "solid", colors: ["#465FFF"] },
    stroke: { lineCap: "round" },
    labels: [t("Progress")],
  };

  function toggleDropdown() { setIsOpen(!isOpen); }
  function closeDropdown() { setIsOpen(false); }

  const stats = [
    { label: t("Target"), value: targetData.target, color: "#D92D20" },
    { label: t("Revenue"), value: targetData.revenue, color: "#039855" },
    { label: t("Today"), value: targetData.today, color: "#039855" },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-100">
      <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 sm:px-6 sm:pt-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{t("Monthly Target")}</h3>
            <p className="mt-1 text-gray-500 text-theme-sm">{t("Target you’ve set for each month")}</p>
          </div>

          <div className="relative inline-block">
            <button className="dropdown-toggle" onClick={toggleDropdown}>⋮</button>
            <Dropdown isOpen={isOpen} onClose={closeDropdown} className="w-40 p-2">
              <DropdownItem
                onItemClick={closeDropdown}
                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
              >
                {t("View More")}
              </DropdownItem>
              <DropdownItem
                onItemClick={closeDropdown}
                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
              >
                {t("Delete")}
              </DropdownItem>
            </Dropdown>
          </div>
        </div>

        <div className="relative">
          <div className="max-h-[330px]" id="chartDarkStyle">
            <Chart options={options} series={series} type="radialBar" height={330} />
          </div>

          <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-[95%] rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
            +{targetData.growth}%
          </span>
        </div>

        <p className="mx-auto mt-10 w-full max-w-[380px] text-center text-sm text-gray-500 sm:text-base">
          {targetData.message || t("You earn more this month. Keep up your good work!")}
        </p>
      </div>

      <div className="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">
        {stats.map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <p className="mb-1 text-center text-gray-500 text-theme-xs sm:text-sm">{item.label}</p>
            <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 sm:text-lg">
              ${item.value}K
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M7.60141 2.33683C7.73885 2.18084 7.9401 2.08243 8.16435 2.08243C8.16475 2.08243 8.16516 2.08243 8.16556 2.08243C8.35773 2.08219 8.54998 2.15535 8.69664 2.30191L12.6968 6.29924C12.9898 6.59203 12.9899 7.0669 12.6971 7.3599C12.4044 7.6529 11.9295 7.65306 11.6365 7.36027L8.91435 4.64004L8.91435 13.5C8.91435 13.9142 8.57856 14.25 8.16435 14.25C7.75013 14.25 7.41435 13.9142 7.41435 13.5L7.41435 4.64442L4.69679 7.36025C4.4038 7.65305 3.92893 7.6529 3.63613 7.35992C3.34333 7.06693 3.34348 6.59206 3.63646 6.29926L7.60141 2.33683Z" fill={item.color}/>
              </svg>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
