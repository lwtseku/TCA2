import { Events } from "@/app/page";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

export const EventCard = ({
  data,
  edit = false,
  full = false,
  handleDelete,
  handleEdit,
}: {
  data: Events;
  edit?: boolean;
  full?: boolean;
  handleDelete?: (id: string | number) => void;
  handleEdit?: (id: string | number, data: Events) => void;
}) => {
  const [newEvent, setNewEvent] = useState<Events>(data);
  return (
    <div className="w-full h-20 bg-white flex border-b-2 border-b-gray-400">
      <div className="w-14 md:w-20 h-full bg-gray-100 text-neutral-600 border-2 border-b-0 border-gray-400  flex justify-center rounded-ss-lg items-center text-2xl md:text-4xl">
        {new Date(data.date).getDate()}
      </div>
      <div className="md:mx-4 mx-2 w-full flex flex-col items-start justify-center">
        <div
          className={`w-full flex gap-4 items-center ${
            edit ? "justify-between" : "justify-start"
          }`}
        >
          <div>
            <div className="text-black md:text-xl font-semibold uppercase">
              {data.name}
            </div>
            <div className="md:text-sm text-xs font-medium w-fit px-3 py-1 rounded-2xl text-neutral-600 bg-gray-100 border border-gray-400">
              {data.type === "vacation"
                ? "Амралт"
                : data.type === "exam"
                ? "Шалтгалт"
                : "Бусад үйл ажиллагаа эвэнт"}
            </div>
          </div>
          {edit && (
            <div className="flex gap-1 border-l border-l-gray-400 pl-4">
              <div className="flex items-center border-r border-r-gray-400 pr-4 mr-3">
                {data.date}
              </div>
              <AlertDialog>
                <AlertDialogTrigger className="w-6 md:w-10 md:h-10 border border-[#2294f5] hover:opacity-70  rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="100"
                    height="100"
                    viewBox="0,0,256,256"
                    className="m-auto h-5 w-5"
                  >
                    <g
                      fill="#2294f5"
                      fillRule="nonzero"
                      stroke="none"
                      strokeWidth="1"
                      strokeLinecap="butt"
                      strokeLinejoin="miter"
                      strokeMiterlimit="10"
                      strokeDasharray=""
                      strokeDashoffset="0"
                      fontFamily="none"
                      fontWeight="none"
                      fontSize="none"
                      textAnchor="none"
                    >
                      <g transform="scale(5.33333,5.33333)">
                        <path d="M36,5.00977c-1.7947,0 -3.58921,0.68037 -4.94922,2.04102l-22.13477,22.13281c-0.41998,0.41998 -0.72756,0.94226 -0.89062,1.51563l-2.9668,10.38867c-0.14899,0.52347 -0.00278,1.08658 0.38208,1.47144c0.38485,0.38485 0.94796,0.53107 1.47144,0.38208l10.39062,-2.9668c0.00065,-0.00065 0.0013,-0.0013 0.00195,-0.00195c0.56952,-0.16372 1.09052,-0.46748 1.51172,-0.88867l22.13281,-22.13476c2.72113,-2.72112 2.72113,-7.17731 0,-9.89844c-1.36001,-1.36064 -3.15452,-2.04102 -4.94922,-2.04102zM36,7.99219c1.0208,0 2.04018,0.39333 2.82617,1.17969c0.00065,0 0.0013,0 0.00195,0c1.57487,1.57488 1.57487,4.08137 0,5.65625l-1.93945,1.93945l-5.65625,-5.65625l1.93945,-1.93945c0.78599,-0.78636 1.80732,-1.17969 2.82813,-1.17969zM29.11133,13.23242l5.65625,5.65625l-18.07422,18.07422c-0.05863,0.05823 -0.13289,0.10283 -0.2168,0.12695l-7.79297,2.22656l2.22656,-7.79492c0,-0.00065 0,-0.0013 0,-0.00195c0.02293,-0.08063 0.06493,-0.15282 0.12695,-0.21484z"></path>
                      </g>
                    </g>
                  </svg>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-1/2">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Хуваарь засах</AlertDialogTitle>
                  </AlertDialogHeader>
                  <div className="p-4">
                    <input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, date: e.target.value })
                      }
                      className="p-2 w-full mb-2 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      placeholder="Нэр"
                      value={newEvent.name}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, name: e.target.value })
                      }
                      className="p-2 mb-2 border w-full border-gray-300 rounded"
                    />
                    <textarea
                      placeholder="Тайлбар"
                      value={newEvent.desc || ""}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, desc: e.target.value })
                      }
                      className="p-2 w-full mb-2 border border-gray-300 rounded"
                    />
                    <select
                      value={newEvent.type}
                      onChange={(e) =>
                        setNewEvent({
                          ...newEvent,
                          type: e.target.value as "event" | "exam" | "vacation",
                        })
                      }
                      className="w-full p-2 mb-2 border border-gray-300 rounded"
                    >
                      <option value="exam">Шалгалт</option>
                      <option value="vacation">Амралт</option>
                      <option value="event">Бусад үйл ажиллагаа эвэнт</option>
                    </select>
                  </div>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Болих</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() =>
                        handleEdit && handleEdit(data.id, newEvent)
                      }
                      className="bg-blue-900 hover:bg-blue-900 hover:opacity-70"
                    >
                      Засах
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <AlertDialog>
                <AlertDialogTrigger className="w-6 md:w-10 md:h-10 border border-[#ff6d6d] hover:opacity-70  rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="100"
                    height="100"
                    viewBox="0,0,256,256"
                    className="m-auto h-5 w-5"
                  >
                    <g
                      fill="#ff6d6d"
                      fillRule="nonzero"
                      stroke="none"
                      strokeWidth="1"
                      strokeLinecap="butt"
                      strokeLinejoin="miter"
                      strokeMiterlimit="10"
                      strokeDasharray=""
                      strokeDashoffset="0"
                      fontFamily="none"
                      fontWeight="none"
                      fontSize="none"
                      textAnchor="none"
                    >
                      <g transform="scale(5.33333,5.33333)">
                        <path d="M24,4c-3.50831,0 -6.4296,2.62143 -6.91992,6h-6.8418c-0.08516,-0.01457 -0.17142,-0.02176 -0.25781,-0.02148c-0.07465,0.00161 -0.14908,0.00879 -0.22266,0.02148h-3.25781c-0.54095,-0.00765 -1.04412,0.27656 -1.31683,0.74381c-0.27271,0.46725 -0.27271,1.04514 0,1.51238c0.27271,0.46725 0.77588,0.75146 1.31683,0.74381h2.13867l2.51758,26.0293c0.27108,2.80663 2.65553,4.9707 5.47461,4.9707h14.73633c2.81922,0 5.20364,-2.16383 5.47461,-4.9707l2.51953,-26.0293h2.13867c0.54095,0.00765 1.04412,-0.27656 1.31683,-0.74381c0.27271,-0.46725 0.27271,-1.04514 0,-1.51238c-0.27271,-0.46725 -0.77588,-0.75146 -1.31683,-0.74381h-3.25586c-0.15912,-0.02581 -0.32135,-0.02581 -0.48047,0h-6.84375c-0.49032,-3.37857 -3.41161,-6 -6.91992,-6zM24,7c1.87916,0 3.42077,1.26816 3.86133,3h-7.72266c0.44056,-1.73184 1.98217,-3 3.86133,-3zM11.65039,13h24.69727l-2.49219,25.74023c-0.12503,1.29513 -1.18751,2.25977 -2.48828,2.25977h-14.73633c-1.29892,0 -2.36336,-0.96639 -2.48828,-2.25977zM20.47656,17.97852c-0.82766,0.01293 -1.48843,0.69381 -1.47656,1.52148v15c-0.00765,0.54095 0.27656,1.04412 0.74381,1.31683c0.46725,0.27271 1.04514,0.27271 1.51238,0c0.46725,-0.27271 0.75146,-0.77588 0.74381,-1.31683v-15c0.00582,-0.40562 -0.15288,-0.7963 -0.43991,-1.08296c-0.28703,-0.28666 -0.67792,-0.44486 -1.08353,-0.43852zM27.47656,17.97852c-0.82766,0.01293 -1.48843,0.69381 -1.47656,1.52148v15c-0.00765,0.54095 0.27656,1.04412 0.74381,1.31683c0.46725,0.27271 1.04514,0.27271 1.51238,0c0.46725,-0.27271 0.75146,-0.77588 0.74381,-1.31683v-15c0.00582,-0.40562 -0.15288,-0.7963 -0.43991,-1.08296c-0.28703,-0.28666 -0.67792,-0.44486 -1.08353,-0.43852z"></path>
                      </g>
                    </g>
                  </svg>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-1/2">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Хуваарт устгах</AlertDialogTitle>
                    <AlertDialogDescription>
                      Та үүнийг устгахдаа итгэлтэй байна уу.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Болих</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete && handleDelete(data.id)}
                      className="bg-[#ff6d6d] hover:bg-[#ff6d6d] hover:opacity-70"
                    >
                      Устгах
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
          {full && (
            <div className="border-l border-l-gray-400 pl-4">
              <div> {data.date}</div>
              <div> {data.desc}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
