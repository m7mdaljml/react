import ReactECharts from "echarts-for-react";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { TransactionCategoryColors } from "../../../domain/meta/enums/expense-tracker/category";

const ExpenseChart = (data: any) => {
  const { t } = useTranslation();

  const chartData = useMemo(() => {
    return (data?.data || []).map((item: any) => ({
      value: item.value,
      name: t(`enums.TransactionCategoryEnum.${item.name}`),
      itemStyle: {
        color: TransactionCategoryColors[item.name],
      },
    }));
  }, [data.data, t]);

  const option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "0%",
      left: "center",
    },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: chartData,
      },
    ],
  };

  return <ReactECharts option={option} />;
};

export default ExpenseChart;
