"use client";

import React from "react";
import GroupDeleteBtn from "./GroupDeleteBtn";
import GroupUpdateButton from "./group-update-button";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { Group } from "@/app/lib/definitions";

const GroupRow: React.FC<{ group: Group; index: number }> = ({
  group,
  index,
}) => {
  return (
    <tr
      className={
        index % 2 === 0
          ? "bg-surface-extra-light dark:bg-surface-extra-light-dark"
          : "bg-surface dark:bg-surface-dark"
      }
    >
      <td className="px-4 py-2 rounded-l-md text-on-medium">
        <PhotoIcon className="w-6 h-6" />
      </td>
      <td className="px-4 py-2">{group.name}</td>
      <td className="px-4 py-2">{group.tag_count}</td>
      <td className="px-4 py-2 text-right">
        <div style={{ whiteSpace: "nowrap" }}>
          {group.last_edited ? (
            <>
              {new Date(group.last_edited).toLocaleDateString(undefined, {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
              -
              {new Date(group.last_edited).toLocaleTimeString(undefined, {
                hour: "numeric",
                minute: "2-digit",
              })}
            </>
          ) : (
            "N/A"
          )}
        </div>
      </td>
      <td className="px-2 py-2 gap-x-2 rounded-r-md flex justify-center">
        <GroupDeleteBtn id={group.id} />
        <GroupUpdateButton group={group} />
      </td>
    </tr>
  );
};

export default GroupRow;
