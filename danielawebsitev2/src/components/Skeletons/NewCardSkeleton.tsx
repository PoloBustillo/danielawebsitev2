import { Card, Skeleton } from "@nextui-org/react";
import React from "react";

const NewCardSkeleton = () => {
  return (
    <Card className="w-[100%] max-w-[300px]" radius="lg">
      <Skeleton className="rounded-lg">
        <div className="h-100 rounded-lg bg-default-300"></div>
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    </Card>
  );
};

export default NewCardSkeleton;
