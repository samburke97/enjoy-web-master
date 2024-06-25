"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { MapPinIcon } from "@heroicons/react/24/solid";
import Search from "../../ui/centers/search";
import DeleteCenterBtn from "./DeleteCenterBtn";
import { Center } from "@/app/lib/definitions";

interface CenterProps {
  centers: Center[];
}

export default function Centers({ centers }: CenterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCenters, setFilteredCenters] = useState(centers);

  useEffect(() => {
    setFilteredCenters(
      centers.filter((center) =>
        center.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, centers]);

  return (
    <>
      <Search placeholder="Search" page="centers" onSearch={setSearchQuery} />
      <div className="container">
        <div className="grid gap-8 grid-cols-1 md:grid-cols-3 lg:grid-cols-3 ">
          {filteredCenters.map((center) => (
            <div
              key={center.id}
              className="bg-white dark:bg-surface-primary-very-light-dark shadow-md rounded-lg overflow-hidden p-4 relative"
            >
              {center.image_url && (
                <div className="h-[160px] w-full overflow-hidden mb-4">
                  <Image
                    src={center.image_url}
                    alt={center.name}
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
                  <p className="text-sm text-on-medium">Tags</p>
                </div>
                <h3 className="text-dark-400 font-semibold mb-1">
                  {center.name}
                </h3>
                <div>
                  <p className="text-sm text-on-medium">Last Edited:</p>
                  <p className="text-xs text-gray-400 dark:text-gray-300">
                    {center.last_edited ? (
                      <>
                        {new Date(center.last_edited).toLocaleDateString(
                          undefined,
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                        -
                        {new Date(center.last_edited).toLocaleTimeString(
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
                <DeleteCenterBtn id={center.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
