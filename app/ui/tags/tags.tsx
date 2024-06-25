"use client";

import { useState, useEffect } from "react";
import TagsDeleteActionButtonClient from "./TagDeleteBtn";
import Search from "../../ui/search";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { Tags as Taggy } from "@/app/lib/definitions";

interface TagProps {
  tags: Taggy[];
}

const Tags = ({ tags }: TagProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTags, setFilteredTags] = useState(tags);

  useEffect(() => {
    setFilteredTags(
      tags.filter((tag) =>
        tag.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, tags]);

  return (
    <>
      <Search placeholder="Search" page="tags" onSearch={setSearchQuery} />
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
            {filteredTags.map((tag, index) => (
              <tr
                key={tag.name}
                className={
                  index % 2 === 0
                    ? "bg-surface-extra-light dark:bg-surface-extra-light-dark"
                    : "bg-surface dark:bg-surface-dark"
                }
              >
                <td className="px-4 py-2 rounded-l-md text-on-medium">
                  <PhotoIcon className="w-6 h-6" />
                </td>
                <td className="px-4 py-2">{tag.name}</td>
                <td className="px-4 py-2 text-right">
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
                </td>
                <td className="px-2 py-2 rounded-r-md flex justify-center">
                  <TagsDeleteActionButtonClient id={tag.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Tags;
