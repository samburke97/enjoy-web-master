"use server";

import { PhotoIcon } from "@heroicons/react/24/outline";
import { fetchTags } from "@/app/lib/data";
import TagsDeleteActionButtonClient from "./TagsDeleteActionButtonClient";

const Tags = async () => {
  const totalTags = await fetchTags();

  return (
    <div className="container py-4">
      <table className="table-auto text-left text-sm w-full">
        <thead>
          <tr className="text-sm text-on-medium">
            <th className="px-4 py-2">ICN</th>
            <th className="px-4 py-2">Tag Name</th>
            <th className="px-4 py-2 text-right">Last Edited</th>
          </tr>
        </thead>
        <tbody>
          {totalTags.map((tag, index) => (
            <tr
              key={tag.name}
              className={
                index % 2 === 0
                  ? "bg-surface-extra-light-dark"
                  : "bg-surface-dark"
              }
            >
              <td className="px-4 py-2 rounded-l-md text-on-medium">
                <PhotoIcon className="w-6 h-6" />
              </td>
              <td className="px-4 py-2">{tag.name}</td>
              <td className="px-4 py-2 text-right">
                <div className="flex justify-between">
                  <span>Last Edited</span>
                  <div style={{ whiteSpace: "nowrap" }}>
                    {tag.last_edited ? (
                      <>
                        {tag.last_edited.toLocaleDateString(undefined, {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                        -
                        {tag.last_edited.toLocaleTimeString(undefined, {
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </>
                    ) : (
                      "N/A"
                    )}
                  </div>
                </div>
              </td>
              <td className="px-2 py-2 rounded-r-md flex justify-center">
                <TagsDeleteActionButtonClient id={tag.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tags;
