import ReactECharts from "echarts-for-react";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

interface OverviewItem {
  month: string;
  income: number;
  expense: number;
  balance: number;
}

interface Props {
  data: OverviewItem[];
}

const OverviewChart = ({ data }: Props) => {
  const { t } = useTranslation();

  const option = useMemo(
    () => ({
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: [
          t("expenseTracker.income"),
          t("expenseTracker.expense"),
          t("expenseTracker.balance"),
        ],
      },
      xAxis: {
        type: "category",
        data: data.map((item) => item.month),
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: t("expenseTracker.income"),
          type: "bar",
          data: data.map((item) => item.income),
          itemStyle: {
            color: "#198754",
          },
        },
        {
          name: t("expenseTracker.expense"),
          type: "bar",
          data: data.map((item) => item.expense),
          itemStyle: {
            color: "#dc3545",
          },
        },
        {
          name: t("expenseTracker.balance"),
          type: "line",
          data: data.map((item) => item.balance),
          itemStyle: {
            color: "#0d6efd",
          },
          lineStyle: {
            color: "#0d6efd",
            width: 3,
          },
        },
      ],
    }),
    [data, t],
  );

  return <ReactECharts option={option} style={{ height: 400 }} />;
};

export default OverviewChart;
