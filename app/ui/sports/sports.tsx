"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { MapPinIcon } from "@heroicons/react/24/solid";
import Search from "../search";
import DeleteSportBtn from "./DeleteSportBtn";
import { Sport } from "@/app/lib/definitions";

interface SportProps {
  sports: Sport[];
}

export default function Sports({ sports }: SportProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSports, setFilteredSports] = useState(sports);

  useEffect(() => {
    setFilteredSports(
      sports.filter((sport) =>
        sport.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, sports]);

  return (
    <>
      <Search placeholder="Search" page="sports" onSearch={setSearchQuery} />
      <div className="grid gap-8 grid-cols-1 md:grid-cols-3 lg:grid-cols-3 ">
        {filteredSports.map((sport) => (
          <div
            key={sport.id}
            className="bg-white dark:bg-surface-primary-very-light-dark shadow-md rounded-lg overflow-hidden p-4 relative"
          >
            {sport.image_url && (
              <div className="h-[160px] w-full overflow-hidden mb-4">
                <Image
                  src={sport.image_url}
                  alt={sport.name}
                  width={112}
                  height={160}
                  layout="fixed"
                  objectFit="cover"
                  className="rounded-lg h-full w-full object-cover"
                />
              </div>
            )}
            <div className="flex flex-col space-y-2">
              <div className="flex items-center mb-2">
                <MapPinIcon className="w-4 text-primary-primary mr-1" />
                <p className="text-sm text-on-medium">0 Centers</p>
              </div>
              <h3 className="text-dark-400 font-semibold mb-1">{sport.name}</h3>
              <div>
                <p className="text-sm text-on-medium">Last Edited:</p>
                <p className="text-xs text-gray-400 dark:text-gray-300">
                  {sport.last_edited ? (
                    <>
                      {new Date(sport.last_edited).toLocaleDateString(
                        undefined,
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                      -
                      {new Date(sport.last_edited).toLocaleTimeString(
                        undefined,
                        {
                          hour: "numeric",
                          minute: "2-digit",
                        }
                      )}
                    </>
                  ) : (
                    "N/A"
                  )}
                </p>
              </div>
            </div>
            <div className="absolute bottom-4 right-4">
              <DeleteSportBtn id={sport.id} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
