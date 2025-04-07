import { Button } from "./ui/button";

type Props = {
  event: string;
  date: string;
  month: string;
  onDelete?: () => void;
  onEdit?: () => void;
  isAdmin?: boolean;
};

const ScheduleCard = ({
  event,
  date,
  month,
  onDelete,
  onEdit,
  isAdmin,
}: Props) => {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-lg font-semibold">{event}</h2>
      <p>{date}</p>
      <p>Month: {month}</p>
      {isAdmin && (
        <div className="flex gap-2 mt-2">
          <Button variant="outline" onClick={onEdit}>
            Edit
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default ScheduleCard;
