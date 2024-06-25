"use client";

import { useState, useEffect } from "react";
import GroupRow from "./groups-rows";
import Search from "../../ui/search";
import { Group } from "@/app/lib/definitions";

interface GroupProps {
  groups: Group[];
}

const Groups = ({ groups }: GroupProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredGroups, setFilteredGroups] = useState(groups);

  useEffect(() => {
    setFilteredGroups(
      groups.filter((group) =>
        group.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, groups]);

  return (
    <>
      <Search placeholder="Search" page="groups" onSearch={setSearchQuery} />
      <div className="container">
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
            {filteredGroups.map((group, index) => (
              <GroupRow group={group} index={index} key={group.id} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Groups;
