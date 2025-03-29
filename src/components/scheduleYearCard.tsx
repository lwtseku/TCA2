import { Events } from "@/app/page";
import { MonthCard } from "./scheduleMonthCard";

export const YearCard = ({
  data,
  year,
}: {
  data: Record<string, Events[]>;
  year: string;
}) => {
  return (
    <div className="w-full">
      <div className="grid md:grid-cols-3 gap-4 ">
        {Object.entries(data).map(([month, groupedEvent]) => (
          <MonthCard data={groupedEvent} key={month} month={month} />
        ))}
      </div>
    </div>
  );
};
