"use client";

import React, { useContext } from "react";
import { GroupsContext } from "@/store/groups-context";
import GroupsModal from "../groups-modal";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
import UpdateGroup from "./create/update-group";
import { Group } from "@/app/(home)/lib/definitions";

const GroupsUpdateButton: React.FC<{ group: Group }> = ({ group }) => {
  const groupsCtx = useContext(GroupsContext);

  const showUpdateHandler = () => {
    groupsCtx.setSelectedGroup(group);
    groupsCtx.showModalAction();
  };

  return (
    <>
      <button onClick={showUpdateHandler}>
        <div className="w-8 h-8 flex justify-center bg-primary-light dark:bg-primary-light-dark border border-dotted border-primary-primary dark:border-primary-primary-dark rounded overflow-hidden">
          <ArrowUpOnSquareIcon className="w-6" />
        </div>
      </button>
      {groupsCtx.modalIsActive && (
        <GroupsModal content={UpdateGroup} modalProps={{ group }} />
      )}
    </>
  );
};

export default GroupsUpdateButton;
