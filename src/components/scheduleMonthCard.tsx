import { Events } from "@/app/page";
import { EventCard } from "./scheduleEventCard";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const MonthCard = ({
  data,
  month,
}: {
  data: Events[];
  month: string;
}) => {
  return (
    <div className="w-full relative h-[260px] overflow-hidden rounded-lg  bg-white  border-gray-300 border border-dashed">
      <div className="text-white bg-blue-900 p-4 text-xl font-bold">
        {month}
      </div>
      <div className="p-4 relative grid gap-4">
        {data.map((item) => (
          <EventCard key={item.id} data={item} />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 flex w-full items-center justify-center bg-gradient-to-b from-[transparent] to-blue-900  hover:opacity-75">
        <AlertDialog>
          <AlertDialogTrigger className="w-full h-full text-white font-bold py-6">
            See more...
          </AlertDialogTrigger>
          <AlertDialogContent className="max-w-screen h-screen md:max-w-[calc(100%-48px)] md:h-[calc(100%-48px)] flex flex-col overflow-auto">
            <AlertDialogHeader className="flex-row justify-between">
              <AlertDialogTitle> {month}</AlertDialogTitle>
              <AlertDialogCancel>Буцах</AlertDialogCancel>
            </AlertDialogHeader>
            <div className="flex flex-col gap-6">
              {data.map((item) => (
                <EventCard key={item.id} data={item} full />
              ))}
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
