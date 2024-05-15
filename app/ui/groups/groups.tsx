"use server";

import { PhotoIcon } from "@heroicons/react/24/outline";
import { fetchGroups } from "@/app/lib/data";
import GroupsDeleteActionButtonClient from "./GroupsDeleteActionButtonClient";

const Groups = async () => {
  const totalGroups = await fetchGroups();

  return (
    <div className="container py-4">
      <table className="table-auto text-left text-sm w-full">
        <thead>
          <tr className="text-sm text-on-medium">
            <th className="px-4 py-2">ICN</th>
            <th className="px-4 py-2">Group Name</th>
            <th className="px-4 py-2">Tags Count</th>
            <th className="px-4 py-2 text-right">Last Edited</th>
          </tr>
        </thead>
        <tbody>
          {totalGroups.map((group, index) => (
            <tr
              key={group.id}
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
                      {group.last_edited.toLocaleDateString(undefined, {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                      -
                      {group.last_edited.toLocaleTimeString(undefined, {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </>
                  ) : (
                    "N/A"
                  )}
                </div>
              </td>
              <td className="px-2 py-2 rounded-r-md flex justify-center">
                <GroupsDeleteActionButtonClient id={group.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Groups;
