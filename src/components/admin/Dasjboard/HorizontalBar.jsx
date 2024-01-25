import { ResponsiveBar } from "@nivo/bar";
import { useEffect, useState } from "react";
import { useGetStatsQuery } from "../../../redux/slice/client/stats/Stats";



const Bar = () => {
  const { data, isLoading } = useGetStatsQuery();

  let bar_data = [
    {
      sector: "Sotuv",
      "Bekor qilindi": data?.bekor_qilindi?.count ?? 0,
      "Bekor qilindiColor": "#f00",
      'Qabul qilindi': data?.qabul_qilindi?.count ?? 0,
      'Qabul qilindiColor': "#0f0",
      Yetkazilmoqda: data?.yetkazilmoqda?.count ?? 0  ,
      YetkazilmoqdaColor: "#ff0",
      Yetkazildi: data?.yetkazildi?.count ?? 0,
      YetkazildiColor: "#0ff",
    },

  ];

  return (
    <ResponsiveBar
      data={bar_data}
      valueFormat={(v) => `${v} ta`}
      keys={["Yetkazildi", "Yetkazilmoqda", "Qabul qilindi", "Bekor qilindi"]}
      indexBy="sector"
      colors={({ id, data }) => data[`${id}Color`]}
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisBottom={{
        legend: "Bo'limlarning topshiriqlarni bajarish ko'rsatkichi",
        legendPosition: "middle",
        legendOffset: 40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      ariaLabel="Statistics"
      barAriaLabel={(e) =>
        e.id + ": " + e.formattedValue + " in sector: " + e.indexValue
      }
    />
  );
};
export default Bar;
