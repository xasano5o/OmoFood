import { ResponsivePie } from "@nivo/pie";
import { useGetStatsQuery } from "../../../redux/slice/client/stats/Stats";

const Pie = ({ mockdata }) => {
  const { data, isLoading } = useGetStatsQuery();

  let pie_data = [
    {
      id: "Bekor Qilindi",
      label: "Bekor Qilindi",
      value:data?.bekor_qilindi?.count ?? 0 ,
      color: "lime",
    },
    {
      id: "Qabul qildindi",
      label: "Qabul qildindi",
      value:data?.qabul_qilindi?.count ?? 0,
      color: "yellow",
    },
    {
      id: "Yetkazilmoqda",
      label: "Yetkazilmoqda",
      value:data?.yetkazilmoqda?.count ?? 0,
      color: "red",
    },
    {
      id: "Yetkazildi",
      label: "Yetkazildi",
      value: data?.yetkazildi?.count ?? 0,
      color: "#bbb",
    },
  ];

  return (
    <ResponsivePie
      data={pie_data}
      valueFormat={(v) => `${v} ta`}
      colors={(d) => d.data.color}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      legends={[
        {
          anchor: "bottom",
          direction: window.innerWidth > 500 ? "row" : "column",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};
export default Pie;
