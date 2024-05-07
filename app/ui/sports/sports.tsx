"use server";
import { fetchSports } from "@/app/lib/data";
import Image from "next/image";
import { MapPinIcon } from "@heroicons/react/24/solid";

import SportsDeleteActionButtonClient from "./SportsDeleteActionButtonClient";

export default async function Sports() {
  const totalSports = await fetchSports();

  return (
    <>
      {totalSports.map((sport) => (
        <div
          key={sport.id}
          className="border-[1px] dark:bg-surface-primary-very-light-dark hover:bg-modal dark:hover:bg-surface-light-dark dark:border-outline-medium-dark w-[451px] rounded-lg relative"
        >
          <div className="flex items-center p-[16px]">
            <div className="h-[112px] w-[112px] overflow-hidden mr-4">
              <Image
                src={sport.image_url}
                alt={sport.name}
                width={112}
                height={112}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="flex flex-col flex-grow">
              <div className="flex items-center mb-2">
                <MapPinIcon className="w-4 text-primary-primary mr-1" />
                <p className="text-sm text-primary-primary">0 Centers</p>
              </div>
              <h3 className="text-dark-400 font-semibold mb-1">{sport.name}</h3>
              <div>
                <p className="text-sm text-on-medium">Last Edited:</p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 mb-4 mr-4">
            <SportsDeleteActionButtonClient id={sport.id} />
          </div>
        </div>
      ))}
    </>
  );
}
