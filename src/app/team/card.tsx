"use client";

import { Markdown } from "@/components/markdown";
import { type UserResponse } from "@/lib/external/Logto";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const MemberCard = ({ name, avatar, uid, onSelect }: { name: string, avatar: string, uid: string, onSelect: (uid: string) => void }) => {
  return (
    <motion.div
      className="flex cursor-pointer flex-col items-center bg-[var(--bg-2)] dark:bg-[var(--bg-3)] gap-2 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      layoutId={`member-card-container-${uid}`} 
      onClick={() => onSelect(uid)}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.img
        layoutId={`member-avatar-${uid}`}
        src={avatar}
        alt={name}
        className="w-20 h-20 rounded-full object-cover"
      />
      <motion.h3 
        layoutId={`member-name-${uid}`}
        className="text-lg font-bold"
      >
        {name}
      </motion.h3>
    </motion.div>
  );
};

const ExpandedMemberCard = ({ uid, user, onClose }: { uid: string, user: UserResponse, onClose: () => void }) => {
  const name = user.name || user.username;
  const avatar = user.avatar;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        layoutId={`member-card-container-${uid}`}
        className="w-full max-w-2xl h-[85vh] bg-[var(--bg-2)] dark:bg-[var(--bg-3)] rounded-xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div className="relative h-40 bg-gray-200 dark:bg-[#272727] flex items-end p-4">
           <div className="flex items-center gap-4">
              <motion.img
                layoutId={`member-avatar-${uid}`}
                src={avatar}
                alt={name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <motion.h3
                layoutId={`member-name-${uid}`}
                className="text-2xl font-bold text-gray-800 dark:text-white"
              >
                {name}
              </motion.h3>
           </div>
        </motion.div>

        <motion.div
          className="p-6 overflow-y-auto flex-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Markdown content={user.customData.bio as string || "> [无数据...]"}/>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export const MemberCardWithExpanded = ({ user, uid }: { user: UserResponse, uid: string }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const name = user.name || user.username;
  const avatar = user.avatar;

  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  const handleClose = () => {
    setSelectedId(null);
  };

  return (
    <>
      <MemberCard name={name} avatar={avatar} uid={uid} onSelect={handleSelect} />

      <AnimatePresence>
        {selectedId === uid && (
          <ExpandedMemberCard 
            uid={uid} 
            user={user}
            onClose={handleClose} 
          />
        )}
      </AnimatePresence>
    </>
  );
};