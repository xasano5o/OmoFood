import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { Cancelled, Doing, Finished, yekazilmoqda, yekazildi} from "../../../assets/task_icons/index.js";
import { useGetStatsQuery } from "../../../redux/slice/client/stats/Stats.jsx";

const Card = ({ title, value, img, delay }) => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div
      data-aos="fade"
      data-aos-delay={delay}
      className="border rounded-xl p-2 bg-white shadow-md  container mx-auto items-center shadow-black/30 grid grid-cols-3 transition-all"
    >
      <div className="col-span-2 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-black whitespace-nowrap">{title}</h3>
        <p className="text-2xl">{value}</p>
      </div>
      <div className="max-w-full ml-auto">
        <img src={img} alt="Icon" className="max-w-full" />
      </div>
    </div>
  );
};

const Stats = () => {
  const { data, isLoading } = useGetStatsQuery();
  return (
    <div className="grid grid-cols-2 container mx-auto md-lg:grid-cols-3 lg:grid-cols-4 gap-2 mt-3 w-full">
        <React.Fragment >
          <Card delay={200} title={"Bekor qilindi"} value={data?.bekor_qilindi?.count ?? 0} img={Cancelled} />
          <Card delay={400} title={"Qabul qildindi"} value={data?.qabul_qilindi?.count ?? 0} img={yekazildi} />
          <Card delay={500} title={"Yetkazilmoqda"} value={data?.yetkazilmoqda?.count ?? 0} img={yekazilmoqda} />
          <Card delay={500} title={"Yetkazildi"} value={data?.yetkazildi?.count ?? 0} img={Finished} />
        </React.Fragment>
    </div>
  );
};

export default Stats;
