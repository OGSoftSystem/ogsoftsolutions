import { mission } from "@/constants/mission";
import MissionComp from "@/components/atom/MissionComp";

export default async function Vision() {
  return (
    <section className="paddingY paddingX">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-10 lg:gap-12">
        {mission.map((item) => (
            <MissionComp
              key={item.desc}
              imgPath={item.imgPath}
              title={item.title}
              desc={item.desc}
            />
        ))}
      </div>
    </section>
  );
}
